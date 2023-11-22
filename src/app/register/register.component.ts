// src/app/register/register.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private router: Router) {}

  register(): void {
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const user = { username: this.username, password: this.password, email: this.email };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    console.log('Usuario registrado exitosamente:', user);

    // Redirige al usuario al componente de login después de registrarse
    this.router.navigate(['/login']);
  }
}
