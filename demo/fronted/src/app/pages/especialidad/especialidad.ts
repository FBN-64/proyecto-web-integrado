import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [CommonModule, FormsModule], // Importante para *ngFor y [(ngModel)]
  templateUrl: './especialidad.html',
  styleUrls: ['./especialidad.css']
})
export class EspecialidadComponent {
  // Conectado al buscador
  filtro: string = '';
  
  // Para agregar y eliminar
  nuevaEspecialidad: string = '';
  especialidadAEliminar: any = null;

  // Tu lista de especialidades
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

  // Filtra la lista en tiempo real
  get especialidadesFiltradas() {
    return this.especialidades.filter(e =>
      e.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  // Agrega una nueva a la lista
  agregarEspecialidad() {
    if (this.nuevaEspecialidad.trim()) {
      this.especialidades.push({ nombre: this.nuevaEspecialidad.trim() });
      this.nuevaEspecialidad = ''; // Limpia el input
    }
  }

  // Prepara la eliminación
  prepararEliminar(especialidad: any) {
    this.especialidadAEliminar = especialidad;
  }

  // Elimina definitivamente
  confirmarEliminar() {
    if (this.especialidadAEliminar) {
      this.especialidades = this.especialidades.filter(e => e !== this.especialidadAEliminar);
      this.especialidadAEliminar = null;
    }
  }
}
