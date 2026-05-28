import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Pacientes.html',
  styleUrls: ['./Pacientes.css']
})
export class PacientesComponent implements OnInit {
  pacientes: any[] = [];
  filtro = '';
  editando = false;
  pacienteSeleccionado: any = null;
  form = { nombre: '', apellido: '', apellidoMaterno: '', dni: '', genero: '', fechaNacimiento: '', telefono: '', email: '' };

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() { this.cargarDatos(); }

  cargarDatos() { this.api.getPacientes().subscribe(p => { this.pacientes = p; this.cdr.detectChanges(); }); }

  get pacientesFiltrados() {
    const f = this.filtro.toLowerCase();
    return this.pacientes.filter(p =>
      p.nombre?.toLowerCase().includes(f) ||
      p.apellido?.toLowerCase().includes(f) ||
      p.dni?.toLowerCase().includes(f)
    );
  }

  prepararNuevo() { this.editando = false; this.form = { nombre: '', apellido: '', apellidoMaterno: '', dni: '', genero: '', fechaNacimiento: '', telefono: '', email: '' }; }
  prepararEditar(p: any) { this.editando = true; this.pacienteSeleccionado = p; this.form = { ...p }; }
  prepararEliminar(p: any) { this.pacienteSeleccionado = p; }

  guardar() {
    if (this.editando && this.pacienteSeleccionado) {
      this.api.updatePaciente(this.pacienteSeleccionado.idPaciente, this.form).subscribe(() => this.cargarDatos());
    } else {
      this.api.createPaciente(this.form).subscribe(() => this.cargarDatos());
    }
  }

  confirmarEliminar() {
    if (this.pacienteSeleccionado) {
      this.api.deletePaciente(this.pacienteSeleccionado.idPaciente).subscribe(() => this.cargarDatos());
    }
  }
}