import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class LayoutComponent {
  constructor(private api: ApiService, private router: Router) {}

  cerrarSesion() {
    this.api.logout().subscribe({
      next: () => this.salir(),
      error: () => this.salir()
    });
  }

  private salir() {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
