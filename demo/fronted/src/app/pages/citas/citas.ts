import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule], // Para usar *ngFor y *ngIf
  templateUrl: './citas.html',
  styleUrls: ['./citas.css']
})
export class CitasComponent {
  // Datos de prueba (Dummy Data) solo para que se vea bonito
  citas = [
    { paciente: 'Juan Pérez', doctor: 'Gros Marcela', especialidad: 'Nutrición', fecha: '23/04/2026', hora: '08:30 AM', estado: 'Confirmada' },
    { paciente: 'María López', doctor: 'Alcántara Diaz Manuel', especialidad: 'Cirugía', fecha: '23/04/2026', hora: '10:00 AM', estado: 'Pendiente' },
    { paciente: 'Carlos Mendoza', doctor: 'Lazarte Mora Lucero', especialidad: 'Psicología', fecha: '24/04/2026', hora: '03:15 PM', estado: 'Confirmada' },
    { paciente: 'Ana Torres', doctor: 'Aliaga Ramos Josue', especialidad: 'Gastroenterología', fecha: '25/04/2026', hora: '09:00 AM', estado: 'Cancelada' },
    { paciente: 'Luis Gómez', doctor: 'Licetti Orestes', especialidad: 'Pediatría', fecha: '25/04/2026', hora: '11:45 AM', estado: 'Confirmada' }
  ];

  // Función para asignar colores a las etiquetas (badges) según el estado
  obtenerClaseEstado(estado: string): string {
    switch (estado) {
      case 'Confirmada': return 'bg-success';
      case 'Pendiente': return 'bg-warning text-dark';
      case 'Cancelada': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}
