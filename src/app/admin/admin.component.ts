// src/app/admin/admin.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] // Agrega esta línea
})
export class AdminComponent implements OnInit {
  users: any[] = [];

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
    // Implementa la lógica de actualización según tus necesidades
    // Por ejemplo, podrías abrir un modal o navegar a una página de actualización
    console.log('Actualizar usuario:', this.users[index]);
  }

  private updateLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
