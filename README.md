# soft-form-angular

[soft-form](https://github.com/sudo-kaizen/soft-form), but built with Angular reactive forms. Follows the same [specifications](#specifications).


## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.1.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Specifications

### `FullNameField`

- Must not be less that 2 characters, must include a space and then a second name

### `EmailField`

- Must be a valid email address

### `PhoneField`

- Must not start with '+234'
- Must start with '070', '080', '090' or '081'

### `PasswordFields`

- Minimum of 6 characters
- Must contain at least one uppercase character, one number, one special
character
- Confirm password must match password field

### `CardNumberField`

- Must match the `XXXX XXXX XXXX XXXX` format.
- As you type, it automatically adds space inbetween each 4 sets of numbers

### `CardExpirDateField`

- Must match `MM/YY` format
- As you type 0123, it should fill the input as 01/23

### `CardPinField`

- Should be 4 characters long
- Only accepts numbers
- Should be a password field
