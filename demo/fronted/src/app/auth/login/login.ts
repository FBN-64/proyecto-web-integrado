import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './Login.html',
  styleUrls: ['./Login.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  cargando = false;

  constructor(private api: ApiService, private router: Router) {}

  iniciarSesion() {
    this.error = '';

    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'Ingresa usuario y contrasena.';
      return;
    }

    this.cargando = true;
    this.api.login(this.username.trim(), this.password).subscribe({
      next: usuario => {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.cargando = false;
        this.router.navigate(['/dashboard/resumen']);
      },
      error: () => {
        localStorage.removeItem('usuario');
        this.error = 'Usuario o contrasena incorrectos';
        this.cargando = false;
      }
    });
  }
}
