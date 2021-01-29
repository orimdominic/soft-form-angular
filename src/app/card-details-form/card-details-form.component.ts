import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function isValidDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const ctrlMonthVal = control.value.substring(0, 2);
    const ctrlMonth = Number.parseInt(ctrlMonthVal, 10);
    if (ctrlMonth < 1 || ctrlMonth > 12) {
      return { isValidDate: true, msg: 'Invalid month' };
    }
    const ctrlYearVal = control.value.substring(3);
    const ctrlYear = Number.parseInt(ctrlYearVal, 10);
    const twoDigitYear = Number.parseInt(
      new Date().getFullYear().toString(10).substr(2)
    );
    if (ctrlYear < twoDigitYear) {
      return { isValidDate: true, msg: 'Is the card expired?' };
    }
    return null;
  };
}

@Component({
  selector: 'app-card-details-form',
  templateUrl: './card-details-form.component.html',
  styleUrls: ['./card-details-form.component.scss'],
})
export class CardDetailsFormComponent implements OnInit {
  cardDetailsForm: FormGroup;
  constructor() {
    this.cardDetailsForm = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(19),
        Validators.maxLength(19),
      ]),
      cardExpirDate: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        isValidDate(),
      ]),
      cardPin: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
    });
  }

  ngOnInit(): void {}

  onCardNumberInput(inputEv: Event) {
    let { value } = inputEv.target as HTMLInputElement;
    value = value.replaceAll(' ', '');
    value = value.split('').reduce((prev, curr, idx, arr) => {
      const position = idx + 1;
      if (position === arr.length || position % 4 !== 0 || idx === 0) {
        return `${prev + curr}`;
      }
      return `${prev + curr} `;
    }, '');
    (inputEv.target as HTMLInputElement).value = value;
    this.cardDetailsForm.controls.cardNumber.patchValue(value);
  }

  onCardExpirDateInput(inputEv: any) {
    if (inputEv.data === null) {
      return;
    }
    let { value } = <HTMLInputElement>inputEv.target;
    value = value
      .replace('/', '')
      .split('')
      .reduce((prev, curr, idx) => {
        return idx === 1 ? prev + curr + '/' : prev + curr;
      }, '');
    (inputEv.target as HTMLInputElement).value = value;
    this.cardDetailsForm.controls.cardExpirDate.patchValue(value);
  }

  preventNonNumeric(keyPressEv: KeyboardEvent) {
    const isNumberKey = Number.isInteger(Number.parseInt(keyPressEv.key, 10));
    if (!isNumberKey) {
      keyPressEv.preventDefault();
    }
  }
}
