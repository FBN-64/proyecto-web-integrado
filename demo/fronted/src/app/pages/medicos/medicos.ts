import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Medicos.html',
  styleUrls: ['./medicos.css']
})
export class MedicosComponent implements OnInit {
  medicos: any[] = [];
  especialidades: any[] = [];
  filtro = '';
  editando = false;
  medicoSeleccionado: any = null;
  form = { nombre: '', apellido: '', dni: '', especialidad: null as any, telefono: '', email: '', descripcionCorta: '' };

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cargarDatos();
    this.api.getEspecialidades().subscribe(e => { this.especialidades = e; this.cdr.detectChanges(); });
  }

  cargarDatos() {
    this.api.getDoctores().subscribe(d => { this.medicos = d; this.cdr.detectChanges(); });
  }

  get medicosFiltrados() {
    const f = this.filtro.toLowerCase();
    return this.medicos.filter(m =>
      m.nombre?.toLowerCase().includes(f) ||
      m.apellido?.toLowerCase().includes(f) ||
      m.especialidad?.nombre?.toLowerCase().includes(f)
    );
  }

  prepararNuevo() { this.editando = false; this.form = { nombre: '', apellido: '', dni: '', especialidad: null, telefono: '', email: '', descripcionCorta: '' }; }
  prepararEditar(m: any) { this.editando = true; this.medicoSeleccionado = m; this.form = { ...m }; }
  prepararEliminar(m: any) { this.medicoSeleccionado = m; }

  guardar() {
    if (this.editando && this.medicoSeleccionado) {
      this.api.updateDoctor(this.medicoSeleccionado.idDoctor, this.form).subscribe(() => this.cargarDatos());
    } else {
      this.api.createDoctor(this.form).subscribe(() => this.cargarDatos());
    }
  }

  confirmarEliminar() {
    if (this.medicoSeleccionado) {
      this.api.deleteDoctor(this.medicoSeleccionado.idDoctor).subscribe(() => this.cargarDatos());
    }
  }
}