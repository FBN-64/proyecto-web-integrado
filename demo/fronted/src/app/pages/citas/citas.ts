import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ¡CRUCIAL para que funcione [(ngModel)] del HTML!

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule], // Se debe agregar FormsModule aquí
  templateUrl: './citas.html',
  styleUrls: ['./citas.css']
})
export class Citas {
  // 1. Variable conectada al buscador
  filtro: string = '';

  // 2. Datos para llenar los selects del modal de "Nueva Cita"
  pacientes = [
    { id: 1, nombre: 'Diego', apellido: 'Davila' },
    { id: 2, nombre: 'David', apellido: 'Espinoza' },
    { id: 3, nombre: 'Fabiola', apellido: 'Mendez' }
  ];

  doctores = [
    { id: 101, nombre: 'Herminio', apellido: 'Rojas', especialidad: { nombre: 'Cardiología' } },
    { id: 102, nombre: 'Luis', apellido: 'Perez', especialidad: { nombre: 'Medicina General' } }
  ];

  // 3. Arreglo principal estructurado exactamente con objetos anidados como los lee tu HTML
  citas = [
    {
      id: 1,
      paciente: this.pacientes[0],
      doctor: this.doctores[0],
      fechaCita: '2026-07-02',
      horaInicio: '10:30',
      estado: 'Confirmada'
    },
    {
      id: 2,
      paciente: this.pacientes[2],
      doctor: this.doctores[1],
      fechaCita: '2026-07-04',
      horaInicio: '16:20',
      estado: 'Pendiente'
    }
  ];

  // 4. Objeto conectado al formulario del modal "Nueva Cita"
  form: any = {
    paciente: null,
    doctor: null,
    fechaCita: '',
    horaInicio: '',
    estado: 'Pendiente'
  };

  // 5. Almacena la cita que se selecciona cuando se hace clic en el botón del tachito
  citaSeleccionadaParaEliminar: any = null;

  // ---- GETTER: LÓGICA DEL BUSCADOR ----
  get citasFiltradas() {
    if (!this.filtro) {
      return this.citas;
    }
    const texto = this.filtro.toLowerCase();
    // Filtra buscando coincidencias en nombre de paciente, apellido de paciente o nombre de doctor
    return this.citas.filter(c =>
      c.paciente?.nombre.toLowerCase().includes(texto) ||
      c.paciente?.apellido.toLowerCase().includes(texto) ||
      c.doctor?.nombre.toLowerCase().includes(texto) ||
      c.doctor?.especialidad?.nombre.toLowerCase().includes(texto)
    );
  }

  // ---- FUNCIONES DEL BOTÓN Y MODALES ----

  prepararNueva() {
    // Limpia el formulario cuando se abre el modal
    this.form = {
      paciente: null,
      doctor: null,
      fechaCita: '',
      horaInicio: '',
      estado: 'Pendiente'
    };
  }

  guardar() {
    // Si se seleccionó paciente, doctor y fecha, agrega la nueva cita a la lista
    if (this.form.paciente && this.form.doctor && this.form.fechaCita) {
      const nuevaCita = {
        id: new Date().getTime(), // Genera un ID temporal
        paciente: this.form.paciente,
        doctor: this.form.doctor,
        fechaCita: this.form.fechaCita,
        horaInicio: this.form.horaInicio,
        estado: this.form.estado
      };
      this.citas.push(nuevaCita);
    }
  }

  prepararEliminar(cita: any) {
    // Guarda la cita seleccionada para que el modal de confirmación sepa cuál borrar
    this.citaSeleccionadaParaEliminar = cita;
  }

  confirmarEliminar() {
    // Elimina la cita del arreglo filtrando por el ID
    if (this.citaSeleccionadaParaEliminar) {
      this.citas = this.citas.filter(c => c.id !== this.citaSeleccionadaParaEliminar.id);
      this.citaSeleccionadaParaEliminar = null;
    }
  }

  // ---- LÓGICA DE COLORES ----

  badgeEstado(estado: string) {
    // Retorna un objeto asignando una clase u otra dependiendo de la palabra
    // Asegúrate de tener estas clases creadas en tu archivo citas.css
    const est = estado.toLowerCase();
    return {
      'badge-confirmada': est === 'confirmada',
      'badge-cancelada': est === 'cancelada',
      'badge-pendiente': est === 'pendiente'
    };
  }
}