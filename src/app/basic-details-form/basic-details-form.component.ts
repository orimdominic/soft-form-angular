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

function generateCharSet(charCodeStart: number, charCodeEnd: number) {
  return Array(charCodeEnd - charCodeStart + 1)
    .fill(undefined)
    .map((_: undefined, i: number) => String.fromCharCode(charCodeStart + i));
}

function containsSpaceChar(control: AbstractControl): ValidationErrors | null {
  const error = {
    containsSpaceChar: true,
    msg: 'Only one name provided.',
  };
  return control.value.includes(' ') ? null : error;
}

function containsMoreThanOneCharNames(
  control: AbstractControl
): ValidationErrors | null {
  const error = {
    containsMoreThanOneCharNames: true,
    msg: 'Names should have more than two characters',
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
      msg: `It must begin with either of ${prefixes.join(', ')}`,
    };
    const firstThreeChars = control.value.substring(0, 3);
    return prefixes.includes(firstThreeChars) ? null : error;
  };
}

function containsSet(setName: string, set: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const error = {
      containsSet: true,
      msg: `Password must contain at least one ${setName}`,
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
    msg: 'Passwords do not match',
  };
}

@Component({
  selector: 'app-basic-details-form',
  templateUrl: './basic-details-form.component.html',
  styleUrls: ['./basic-details-form.component.scss'],
})
export class BasicDetailsFormComponent implements OnInit {
  userBasicForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.userBasicForm = this.fb.group({
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

  ngOnInit(): void {}

  onNext() {
    debugger;
    console.log('next');

    this.router.navigate(['/card-details-form']);
  }
}
