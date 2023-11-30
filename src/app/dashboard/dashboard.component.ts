import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  showUserName = false;
  userName = '';
  user: any = {};
  isAuthenticated = false;

  jobOffers: any[] = [];
  appliedOffers: any[] = [];

  constructor(private router: Router) {
    this.isAuthenticated = true;

    this.userName = localStorage.getItem('currentUser') || 'Usuario Ejemplo';

    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    this.user = users.find((u: any) => u.username === this.userName) || {};

    this.jobOffers = [
      { id: 1, title: 'Desarrollador Frontend', company: 'ABC Software', salary: '$60,000', attachments: [] },
      { id: 2, title: 'Desarrollador Backend', company: 'XYZ Tech', salary: '$65,000', attachments: [] },
      { id: 3, title: 'Ingeniero de Software', company: '123 Solutions', salary: '$70,000', attachments: [] },
      { id: 4, title: 'Analista de QA', company: 'Tech Innovations', salary: '$55,000', attachments: [] }
    ];
  }

  applyToJob(offer: any): void {
    const input = document.createElement('input');
    input.type = 'file';

    // Escucha el evento 'change' del input de archivo
    input.addEventListener('change', (event: any) => {
      const file = event.target.files[0];

      // Verifica si se seleccionó un archivo
      if (file) {
        offer.attachments.push(file);

        Swal.fire({
          icon: 'success',
          title: 'Hoja de Vida Cargada',
          text: `Has cargado tu hoja de vida para ${offer.title} en ${offer.company}`
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar la hoja de vida',
          text: 'No se seleccionó ningún archivo.'
        });
      }
    });

    // Abre el diálogo de selección de archivo
    input.click();
  }

  viewAppliedOffers(event: Event): void {
    event.preventDefault();

    if (this.appliedOffers.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No hay ofertas aplicadas',
        text: 'Aún no te has postulado a ninguna oferta de empleo.'
      });
    } else {
      let offerList = '';

      this.appliedOffers.forEach((offer) => {
        let attachments = '';
        offer.attachments.forEach((attachment: any) => {
          attachments += `<p>Archivo adjunto: ${attachment.name}</p>`;
        });

        offerList += `<div>
                        <p>${offer.title} en ${offer.company}</p>
                        ${attachments}
                      </div>`;
      });

      Swal.fire({
        title: 'Ofertas Aplicadas',
        html: offerList,
        icon: 'info',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  viewJobOffers(event: Event): void {
    event.preventDefault();

    let offerList = '';

    this.jobOffers.forEach((offer) => {
      offerList += `<div>
                      <p>${offer.title} en ${offer.company} - Salario: ${offer.salary}</p>
                      <button (click)="applyToJob(${JSON.stringify(offer)})">Cargar Hoja de Vida</button>
                    </div>`;
    });

    Swal.fire({
      title: 'Ofertas de Empleo Disponibles',
      html: offerList,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }

  showModal(): void {
    Swal.fire({
      title: 'Nombre de Usuario',
      text: this.userName,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }

  viewProfile(event: Event): void {
    event.preventDefault();

    Swal.fire({
      title: 'Perfil de Usuario',
      html: `<p><strong>Nombre de Usuario:</strong> ${this.user.username}</p>
            <p><strong>Correo Electrónico:</strong> ${this.user.email}</p>`,
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
