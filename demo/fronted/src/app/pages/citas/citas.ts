import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Citas.html',
  styleUrls: ['./citas.css']
})
export class CitasComponent implements OnInit {
  citas: any[] = [];
  doctores: any[] = [];
  pacientes: any[] = [];
  filtro = '';
  citaSeleccionada: any = null;
  form = { paciente: null as any, doctor: null as any, fechaCita: '', horaInicio: '', estado: 'confirmada' };

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarDatos();
    this.api.getDoctores().subscribe(d => { this.doctores = d; this.cdr.detectChanges(); });
    this.api.getPacientes().subscribe(p => { this.pacientes = p; this.cdr.detectChanges(); });
  }

  cargarDatos() {
    this.api.getCitas().subscribe(c => { this.citas = c; this.cdr.detectChanges(); });
  }

  get citasFiltradas() {
    const f = this.filtro.toLowerCase();
    return this.citas.filter(c =>
      c.paciente?.nombre?.toLowerCase().includes(f) ||
      c.doctor?.nombre?.toLowerCase().includes(f)
    );
  }

  badgeEstado(estado: string) {
    switch (estado?.toLowerCase()) {
      case 'confirmada': return 'badge-green';
      case 'pendiente': return 'badge-yellow';
      case 'cancelada': return 'badge-red';
      default: return 'badge-gray';
    }
  }

  prepararNueva() { this.form = { paciente: null, doctor: null, fechaCita: '', horaInicio: '', estado: 'confirmada' }; }
  prepararEliminar(c: any) { this.citaSeleccionada = c; }

  guardar() { this.api.createCita(this.form).subscribe(() => this.cargarDatos()); }

  confirmarEliminar() {
    if (this.citaSeleccionada) {
      this.api.deleteCita(this.citaSeleccionada.idCita).subscribe(() => this.cargarDatos());
    }
  }
}