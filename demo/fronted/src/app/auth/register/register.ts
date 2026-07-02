import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMsg: string = '';

  constructor(private fb: FormBuilder, private api: ApiService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  registrar() {
    // Si el formulario está vacío o es inválido, no hace nada
    if (this.registerForm.invalid) return;

    // Llama al backend para registrar al usuario
    this.api.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Usuario creado con éxito como ADMIN');
        this.router.navigate(['/login']); // Lo manda al login
      },
      error: (err) => {
        this.errorMsg = err.error?.message || 'Error al conectar con la base de datos';
      }
    });
  }
}
