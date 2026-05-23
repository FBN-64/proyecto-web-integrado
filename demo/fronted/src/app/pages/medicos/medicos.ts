import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule], // ¡Súper importantes para la tabla y el buscador!
  templateUrl: './medicos.html',
  styleUrls: ['./medicos.css']
})
export class MedicosComponent {
  // Variable conectada al buscador
  filtro: string = '';
  
  // Variables para el nuevo médico y el que se va a eliminar
  nuevoMedico = { nombre: '', especialidad: '' };
  medicoAEliminar: any = null;

  // Tu lista de médicos (puse los primeros, puedes agregar el resto siguiendo este formato)
  medicos = [
    { nombre: 'Alcántara Diaz Manuel', especialidad: 'Cirugía de Cabeza Cuello y Maxilo facial' },
    { nombre: 'Aliaga Ramos Josue', especialidad: 'Gastroenterología' },
    { nombre: 'Asmat Ramírez Victor Arturo', especialidad: 'Medicina Interna' },
    { nombre: 'Basombrío Velasquez Jorge', especialidad: 'Traumatología' },
    { nombre: 'Bello Sedano Alexis Gustavo', especialidad: 'Cardiología' }
  ];

  // El superpoder de Angular: Filtra la tabla automáticamente mientras escribes
  get medicosFiltrados() {
    return this.medicos.filter(m =>
      m.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      m.especialidad.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  // Función para guardar el nuevo médico
  agregarMedico() {
    if (this.nuevoMedico.nombre && this.nuevoMedico.especialidad) {
      this.medicos.push({ ...this.nuevoMedico });
      this.nuevoMedico = { nombre: '', especialidad: '' }; // Limpiamos el formulario
    }
  }

  // Prepara el médico que seleccionaste para borrar
  prepararEliminar(medico: any) {
    this.medicoAEliminar = medico;
  }

  // Confirma y borra
  confirmarEliminar() {
    if (this.medicoAEliminar) {
      this.medicos = this.medicos.filter(m => m !== this.medicoAEliminar);
      this.medicoAEliminar = null;
    }
  }
}