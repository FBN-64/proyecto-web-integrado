import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-citas',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './citas.html',
  styleUrls: ['./citas.css']
})
export class CitasComponent implements OnInit {
  citas: any[] = [];
  doctores: any[] = [];
  pacientes: any[] = [];
  filtro = '';
  citaSeleccionada: any = null;
  citaForm: FormGroup;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.citaForm = this.fb.group({
      paciente: [null, Validators.required],
      doctor: [null, Validators.required],
      fechaCita: ['', Validators.required],
      horaInicio: ['', Validators.required],
      estado: ['confirmada', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarDatos();
    this.api.getDoctores().subscribe(d => { this.doctores = d; this.cdr.detectChanges(); });
    this.api.getPacientes().subscribe(p => { this.pacientes = p; this.cdr.detectChanges(); });
  }

  cargarDatos() { this.api.getCitas().subscribe(c => { this.citas = c; this.cdr.detectChanges(); }); }

  actualizarFiltro(event: any) { this.filtro = event.target.value; }

  get citasFiltradas() {
    const f = this.filtro.toLowerCase();
    return this.citas.filter(c => c.paciente?.nombre?.toLowerCase().includes(f) || c.doctor?.nombre?.toLowerCase().includes(f));
  }

  badgeEstado(estado: string) {
    switch (estado?.toLowerCase()) {
      case 'confirmada': return 'badge-green';
      case 'pendiente': return 'badge-yellow';
      case 'cancelada': return 'badge-red';
      default: return 'badge-gray';
    }
  }

  prepararNueva() { this.citaForm.reset({ estado: 'confirmada' }); }
  prepararEliminar(c: any) { this.citaSeleccionada = c; }

  guardar() {
    if(this.citaForm.invalid) return;
    this.api.createCita(this.citaForm.value).subscribe(() => this.cargarDatos());
  }

  confirmarEliminar() {
    if (this.citaSeleccionada) {
      this.api.deleteCita(this.citaSeleccionada.idCita).subscribe(() => this.cargarDatos());
    }
  }
}
