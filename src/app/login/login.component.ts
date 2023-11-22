import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const user = users.find((u: any) => u.username === this.username && u.password === this.password);

    if (user) {
      console.log('Login exitoso');

      // Redirige al usuario a la interfaz de administrador después del inicio de sesión
      this.router.navigate(['/admin']);
    } else {
      console.log('Login fallido');
    }
  }
}
