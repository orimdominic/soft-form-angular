import { Injectable } from '@angular/core';

interface User {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  cardNumber?: string;
  cardPin?: string;
  cardExpirDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private user: User | null = null;
  constructor() {}

  setUser(props: object) {
    this.user = { ...this.user, ...props };
  }

  getUser(): User | null {
    return this.user ? { ...this.user } : null;
  }
}
