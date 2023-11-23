// admin.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  deleteUser(index: number): void {
    this.users.splice(index, 1);
    this.updateLocalStorage();
  }

  updateUser(index: number): void {
    console.log('Actualizar usuario:', this.users[index]);
  }

  private updateLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  // Función para cerrar sesión
  logout(): void {
    this.router.navigate(['/login']);
  }
}
