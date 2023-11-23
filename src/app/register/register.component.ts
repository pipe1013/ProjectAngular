import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  register() {
    if (this.username.trim() === '' || this.email.trim() === '' || this.password.trim() === '') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos.'
      });
      return;
    }
    const validationMessage = this.isFormValid();
    if (validationMessage) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: validationMessage
      });
      return;
    }

    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

   
    // Comprobar si el usuario ya existe
    const userExists = users.some((u: any) => u.username === this.username);
    if (userExists) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre de usuario ya existe. Por favor, elige otro nombre de usuario.'
      });
      return;
    }

    const user = { username: this.username, password: this.password, email: this.email };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    


    Swal.fire({
      icon: 'success',
      title: '¡Registro exitoso!',
      text: `Usuario ${this.username} registrado exitosamente.`
    });

    this.router.navigate(['/login']);
  }

  isFormValid(): string | null {
    const minUsernameLength = 3;
    const minPasswordLength = 6;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isValidUsername = this.username.trim().length >= minUsernameLength;
    const isValidEmail = emailRegex.test(this.email.trim());
    const isValidPassword = this.password.trim().length >= minPasswordLength;

    if (!isValidUsername) {
      return 'El nombre de usuario debe tener al menos ' + minUsernameLength + ' caracteres.';
    }

    if (!isValidEmail) {
      return 'El formato del correo electrónico no es válido.';
    }

    if (!isValidPassword) {
      return 'La contraseña debe tener al menos ' + minPasswordLength + ' caracteres.';
    }

    return null;
  }
}
