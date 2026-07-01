import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './especialidad.html',
  styleUrls: ['./especialidad.css']
})
export class EspecialidadComponent {
  filtro: string = '';
  especialidadAEliminar: any = null;
  especialidadForm: FormGroup;

  especialidades = [
    { nombre: 'Cirugía de Cabeza, Cuello y Maxilofacial' },
    { nombre: 'Gastroenterología' },
    { nombre: 'Medicina Interna' },
    { nombre: 'Traumatología' },
    { nombre: 'Cardiología' },
    { nombre: 'Terapia Física' },
    { nombre: 'Anatomía Patológica' },
    { nombre: 'Medicina General' },
    { nombre: 'Ginecología' },
    { nombre: 'Cirugía General' },
    { nombre: 'Urología' },
    { nombre: 'Psicología' },
    { nombre: 'Otorrinolaringología' },
    { nombre: 'Nutrición' },
    { nombre: 'Reumatología' },
    { nombre: 'Pediatría' },
    { nombre: 'Oftalmología' },
    { nombre: 'Endocrinología' },
    { nombre: 'Obstetricia' },
    { nombre: 'Anestesiología' },
    { nombre: 'Neurología' },
    { nombre: 'Odontología' },
    { nombre: 'Cirugía de Tórax y Cardiovascular' },
    { nombre: 'Cirugía Oncológica' },
    { nombre: 'Medicina Física' }
  ];
  constructor(private fb: FormBuilder) {
    this.especialidadForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  actualizarFiltro(event: any) { this.filtro = event.target.value; }

  get especialidadesFiltradas() {
    return this.especialidades.filter(e => e.nombre.toLowerCase().includes(this.filtro.toLowerCase()));
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
