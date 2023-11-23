// src/app/login/login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login(): void {
    if (!this.isFormValid()) {
      // Si el formulario no es válido, muestra un mensaje de error y no realiza el inicio de sesión
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa ambos campos.'
      });
      return;
    }

    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find((u: any) => u.username === this.username && u.password === this.password);

    if (user) {
      Swal.fire({
        icon: 'success',
        title: '¡Inicio de sesión exitoso!',
        text: `¡Bienvenido de nuevo, ${this.username}!`
      });

      // Redirige al usuario a la interfaz de administrador después del inicio de sesión
      this.router.navigate(['/admin']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.'
      });
    }
  }

  isFormValid(): boolean {
    return this.username.trim() !== '' && this.password.trim() !== '';
  }
}
