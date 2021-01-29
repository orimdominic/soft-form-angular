import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from '../user-store.service';
import { debounceTime } from 'rxjs/operators';

function generateCharSet(charCodeStart: number, charCodeEnd: number) {
  return Array(charCodeEnd - charCodeStart + 1)
    .fill(undefined)
    .map((_: undefined, i: number) => String.fromCharCode(charCodeStart + i));
}

function containsSpaceChar(control: AbstractControl): ValidationErrors | null {
  const error = {
    containsSpaceChar: true,
    // msg: 'Only one name provided.',
  };
  return control.value.includes(' ') ? null : { containsSpaceChar: true };
}

function containsMoreThanOneCharNames(
  control: AbstractControl
): ValidationErrors | null {
  const error = {
    containsMoreThanOneCharNames: true,
  };
  const names = control.value.split(' ');
  if (names.length > 1) {
    return names[0].length >= 2 && names[1].length >= 2 ? null : error;
  }
  return error;
}

function startsWith(...prefixes: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const error = {
      startsWith: true,
      // msg: `It must begin with either of ${prefixes.join(', ')}`,
    };
    const firstThreeChars = control.value.substring(0, 3);
    return prefixes.includes(firstThreeChars) ? null : error;
  };
}

function containsSet(setName: string, set: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const error = {
      containsSet: true,
      // msg: `Password must contain at least one ${setName}`,
    };
    const x = control.value
      .split('')
      .some((char: string) => set.includes(char));
    return control.value.split('').some((char: string) => set.includes(char))
      ? null
      : error;
  };
}

function comparePasswords(control: AbstractControl): ValidationErrors | null {
  const passwordVal = control.get('password')?.value;
  const confirmPasswordVal = control.get('confirmPassword')?.value;
  if (passwordVal === confirmPasswordVal) {
    return null;
  }
  return {
    passwordMatch: true,
  };
}

@Component({
  selector: 'app-basic-details-form',
  templateUrl: './basic-details-form.component.html',
  styleUrls: ['./basic-details-form.component.scss'],
})
export class BasicDetailsFormComponent implements OnInit {
  basicDetailsForm: FormGroup;
  // fullNameMsg: string[] = [];
  // emailMsg: string[] = [];
  // phoneMsg: string[] = [];
  // passwordGroupMsg: string[] = [];
  // passwordMsg: string[] = [];
  // feedbackMessages :{[key: string]: string} = {
  //   containsSpaceChar: 'Only one name provided.',
  //   containsMoreThanOneCharNames: 'Names should have more than one character',
  //   startsWith: 'Must start with ...',
  //   passwordMatch: 'Passwords do not match',
  //   required: 'This field is required'
  // };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userStore: UserStoreService
  ) {
    this.basicDetailsForm = this.fb.group({
      fullName: [
        '',
        [Validators.required, containsSpaceChar, containsMoreThanOneCharNames],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
          startsWith('070', '080', '090', '081'),
          Validators.pattern('[0-9]{11}'), // is 11 characters containing only 0-9
        ],
      ],
      passwordGroup: this.fb.group(
        {
          password: [
            '',
            [
              Validators.required,
              Validators.minLength(6),
              comparePasswords,
              containsSet('uppercase', generateCharSet(65, 90)),
              containsSet('lowercase', generateCharSet(97, 122)),
              containsSet(
                'symbol',
                '~`!@#$%^&*()_-+={[]}:;"\'\\|<,>.'.split('')
              ),
            ],
          ],
          confirmPassword: ['', [Validators.required]],
        },
        {
          validators: [comparePasswords],
        }
      ),
    });
  }

  ngOnInit(): void {
    const fullNameCtrl = this.basicDetailsForm.get('fullName');
    fullNameCtrl?.valueChanges.pipe(debounceTime(1500)).subscribe((val) => {
      if (fullNameCtrl.invalid) {
        fullNameCtrl.setErrors({ invalid: true });
      }
    });
  }

  // setFullNameMsg(c: AbstractControl) {
  //   this.fullNameMsg=[]
  //   if((c.touched || c.dirty) && c.errors){
  //     this.fullNameMsg = Object.keys(c.errors).map(key => this.feedbackMessages[key])
  //   }
  // }

  onNext() {
    this.userStore.setUser(this.basicDetailsForm.value);
    this.router.navigate(['/card-details-form']);
  }

  preventNonNumeric(keyPressEv: KeyboardEvent) {
    const isNumberKey = Number.isInteger(Number.parseInt(keyPressEv.key, 10));
    if (!isNumberKey) {
      keyPressEv.preventDefault();
    }
  }
}
