import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-pacientes',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './Pacientes.html',
  styleUrls: ['./Pacientes.css']
})
export class PacientesComponent implements OnInit {
  pacientes: any[] = [];
  filtro = '';
  editando = false;
  pacienteSeleccionado: any = null;
  pacienteForm: FormGroup;
  form: any = {};

  constructor(private api: ApiService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.pacienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellidoMaterno: ['', [Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$')]], // Es opcional, pero si escribe, deben ser letras
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^9[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() { this.cargarDatos(); }

  cargarDatos() { this.api.getPacientes().subscribe(p => { this.pacientes = p; this.cdr.detectChanges(); }); }

  // BUSCADOR BLINDADO
  get pacientesFiltrados() {
    if (!this.pacientes) return [];
    const f = (this.filtro || '').toLowerCase();
    return this.pacientes.filter(p =>
      (p?.nombre || '').toLowerCase().includes(f) ||
      (p?.apellido || '').toLowerCase().includes(f) ||
      (p?.dni || '').toLowerCase().includes(f)
    );
  }

  prepararNuevo() { this.editando = false; this.pacienteForm.reset({ genero: '' }); }
  prepararEditar(p: any) { this.editando = true; this.pacienteSeleccionado = p; this.pacienteForm.patchValue(p); }
  prepararEliminar(p: any) { this.pacienteSeleccionado = p; }

  guardar() {
    if (this.pacienteForm.invalid) return;
    const datos = this.pacienteForm.value;
    if (this.editando && this.pacienteSeleccionado) {
      this.api.updatePaciente(this.pacienteSeleccionado.idPaciente, datos).subscribe(() => this.cargarDatos());
    } else {
      this.api.createPaciente(datos).subscribe(() => this.cargarDatos());
    }
  }

  confirmarEliminar() {
    if (this.pacienteSeleccionado) {
      this.api.deletePaciente(this.pacienteSeleccionado.idPaciente).subscribe(() => this.cargarDatos());
    }
  }
}
