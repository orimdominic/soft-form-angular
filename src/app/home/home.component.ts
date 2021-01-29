import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentYear = new Date().getFullYear();
  specs = [
    {
      title: 'full name',
      descs: [
        'Names not be less that 2 characters',
        'Full name must include a space and then a second name',
      ],
    },
    {
      title: 'email',
      descs: ['Must be a valid email address'],
    },
    {
      title: 'phone number',
      descs: [
        "Must not start with '+234'",
        "Must start with '070', '080', '090' or '081'",
      ],
    },
    {
      title: 'passwords',
      descs: [
        'Minimum of 6 characters',
        'Must contain at least one uppercase character, one number, one special character',
        'Confirm password must match password',
      ],
    },
    {
      title: 'card number',
      descs: [
        'Must match the `XXXX XXXX XXXX XXXX` format.',
        'As one types, it automatically adds space inbetween each 4 sets of numbers',
      ],
    },
    {
      title: 'card expiry date',
      descs: [
        'Must match `MM/YY` format',
        'As one types 0123, it should fill the input as 01/23',
      ],
    },
    {
      title: 'card pin',
      descs: [
        'Should be 4 characters long',
        'Only accepts numbers',
        'Should be a password field',
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
