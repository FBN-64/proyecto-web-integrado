import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './especialidad.html',
  styleUrls: ['./especialidad.css']
})
export class EspecialidadComponent {
  filtro = '';
  especialidadAEliminar: any = null;
  especialidadForm: FormGroup;
  nuevaEspecialidad: string = '';
  especialidades = [
    { nombre: 'Cirugía de Cabeza, Cuello y Maxilofacial' }, { nombre: 'Gastroenterología' },
    { nombre: 'Medicina Interna' }, { nombre: 'Traumatología' }
  ];

  constructor(private fb: FormBuilder) {
    this.especialidadForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  // BUSCADOR BLINDADO
  get especialidadesFiltradas() {
    if (!this.especialidades) return [];
    const f = (this.filtro || '').toLowerCase();
    return this.especialidades.filter(e =>
      (e?.nombre || '').toLowerCase().includes(f)
    );
  }

  agregarEspecialidad() {
    if (this.especialidadForm.valid) {
      const nom = this.especialidadForm.get('nombre')?.value;
      this.especialidades.push({ nombre: nom.trim() });
      this.especialidadForm.reset();
    }
  }

  prepararEliminar(especialidad: any) { this.especialidadAEliminar = especialidad; }

  confirmarEliminar() {
    if (this.especialidadAEliminar) {
      this.especialidades = this.especialidades.filter(e => e !== this.especialidadAEliminar);
      this.especialidadAEliminar = null;
    }
  }
}
