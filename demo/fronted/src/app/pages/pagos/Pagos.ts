import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({ selector: 'app-pagos', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './Pagos.html', styleUrls: ['./Pagos.css'] })
export class PagosComponent implements OnInit {
  pagos: any[] = [];
  filtro = '';
  metodo = '';
  cargando = true;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}
  ngOnInit() { this.cargarDatos(); }

  cargarDatos() {
    this.cargando = true;
    this.api.getPagos().subscribe(pagos => { this.pagos = pagos ?? []; this.cargando = false; this.cdr.detectChanges(); });
  }

  get metodos() { return Array.from(new Set(this.pagos.map(p => p.metodoPago || 'Sin metodo'))).sort(); }

  get pagosFiltrados() {
    const texto = this.filtro.trim().toLowerCase();
    return this.pagos.filter(pago => {
      const metodoOk = !this.metodo || (pago.metodoPago || 'Sin metodo') === this.metodo;
      const paciente = `${pago.cita?.paciente?.nombre ?? ''} ${pago.cita?.paciente?.apellido ?? ''}`.toLowerCase();
      const doctor = `${pago.cita?.doctor?.nombre ?? ''} ${pago.cita?.doctor?.apellido ?? ''}`.toLowerCase();
      const ref = `${pago.referencia ?? ''}`.toLowerCase();
      return metodoOk && (!texto || paciente.includes(texto) || doctor.includes(texto) || ref.includes(texto));
    });
  }

  get totalIngresos() { return this.pagosFiltrados.reduce((total, pago) => total + Number(pago.monto ?? 0), 0); }
  get totalPagos() { return this.pagosFiltrados.length; }
  get promedioPago() { return this.totalPagos ? this.totalIngresos / this.totalPagos : 0; }

  nombrePaciente(pago: any) {
    const paciente = pago?.cita?.paciente;
    return paciente ? `${paciente.nombre ?? ''} ${paciente.apellido ?? ''}`.trim() : 'Paciente no registrado';
  }

  nombreDoctor(pago: any) {
    const doctor = pago?.cita?.doctor;
    return doctor ? `Dr. ${doctor.nombre ?? ''} ${doctor.apellido ?? ''}`.trim() : 'Doctor no registrado';
  }
}
