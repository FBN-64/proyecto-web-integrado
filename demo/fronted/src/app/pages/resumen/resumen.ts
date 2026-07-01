import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './Resumen.html',
  styleUrls: ['./Resumen.css']
})
export class ResumenComponent implements OnInit {
  totalDoctores = 0;
  totalEspecialidades = 0;
  totalPacientes = 0;
  totalCitas = 0;
  totalHorarios = 0;
  totalPagos = 0;
  totalMensajes = 0;
  mensajesPendientes = 0;
  citasConfirmadas = 0;
  citasPendientes = 0;
  citasCanceladas = 0;
  ingresosTotales = 0;
  ticketPromedio = 0;
  cargando = true;
  error = '';

  citas: any[] = [];
  pagos: any[] = [];
  mensajes: any[] = [];
  doctores: any[] = [];
  horarios: any[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargarDashboard(); }

  cargarDashboard() {
    this.cargando = true;
    this.error = '';

    forkJoin({
      doctores: this.api.getDoctores(),
      especialidades: this.api.getEspecialidades(),
      pacientes: this.api.getPacientes(),
      citas: this.api.getCitas(),
      horarios: this.api.getHorarios(),
      pagos: this.api.getPagos(),
      mensajes: this.api.getMensajes()
    }).subscribe({
      next: data => {
        this.doctores = data.doctores ?? [];
        this.citas = data.citas ?? [];
        this.horarios = data.horarios ?? [];
        this.pagos = data.pagos ?? [];
        this.mensajes = data.mensajes ?? [];
        this.totalDoctores = this.doctores.length;
        this.totalEspecialidades = data.especialidades?.length ?? 0;
        this.totalPacientes = data.pacientes?.length ?? 0;
        this.totalCitas = this.citas.length;
        this.totalHorarios = this.horarios.length;
        this.totalPagos = this.pagos.length;
        this.totalMensajes = this.mensajes.length;
        this.mensajesPendientes = this.mensajes.filter(m => !m.leido).length;
        this.citasConfirmadas = this.contarCitasPorEstado('confirmada');
        this.citasPendientes = this.contarCitasPorEstado('pendiente');
        this.citasCanceladas = this.contarCitasPorEstado('cancelada');
        this.ingresosTotales = this.pagos.reduce((total, pago) => total + Number(pago.monto ?? 0), 0);
        this.ticketPromedio = this.totalPagos ? this.ingresosTotales / this.totalPagos : 0;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar el resumen. Verifica que Spring Boot este activo.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  get proximasCitas() {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    return [...this.citas]
      .filter(c => c.fechaCita && new Date(`${c.fechaCita}T00:00:00`) >= hoy)
      .sort((a, b) => `${a.fechaCita} ${a.horaInicio}`.localeCompare(`${b.fechaCita} ${b.horaInicio}`))
      .slice(0, 6);
  }

  get pagosRecientes() {
    return [...this.pagos]
      .sort((a, b) => new Date(b.fechaPago).getTime() - new Date(a.fechaPago).getTime())
      .slice(0, 5);
  }

  get mensajesRecientes() {
    return [...this.mensajes]
      .sort((a, b) => new Date(b.fechaRecibido).getTime() - new Date(a.fechaRecibido).getTime())
      .slice(0, 5);
  }

  get topEspecialidades() {
    const conteo = new Map<string, number>();
    this.doctores.forEach(doctor => {
      const nombre = doctor.especialidad?.nombre || doctor.especialidadNombre || 'Sin especialidad';
      conteo.set(nombre, (conteo.get(nombre) ?? 0) + 1);
    });
    return Array.from(conteo.entries()).map(([nombre, total]) => ({ nombre, total })).sort((a, b) => b.total - a.total).slice(0, 5);
  }

  porcentaje(valor: number, total: number) { return total ? Math.round((valor / total) * 100) : 0; }

  nombrePaciente(cita: any) {
    const paciente = cita?.paciente;
    return paciente ? `${paciente.nombre ?? ''} ${paciente.apellido ?? ''}`.trim() : 'Paciente no registrado';
  }

  nombreDoctor(cita: any) {
    const doctor = cita?.doctor;
    return doctor ? `Dr. ${doctor.nombre ?? ''} ${doctor.apellido ?? ''}`.trim() : 'Doctor no registrado';
  }

  private contarCitasPorEstado(estado: string) {
    return this.citas.filter(c => (c.estado ?? '').toLowerCase() === estado).length;
  }
}
