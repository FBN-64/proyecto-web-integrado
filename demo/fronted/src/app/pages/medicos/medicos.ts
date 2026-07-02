import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// IMPORTAMOS AMBOS MÓDULOS AQUÍ
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // INYECTADOS AQUÍ
  templateUrl: './medicos.html',
  styleUrls: ['./medicos.css']
})
export class MedicosComponent implements OnInit {
  medicos: any[] = [];
  especialidades: any[] = [];
  filtro = '';
  editando = false;
  medicoSeleccionado: any = null;
  medicoForm: FormGroup;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      especialidad: [null, Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^9[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
      descripcionCorta: ['']
    });
  }

  ngOnInit() {
    this.cargarDatos();
    this.api.getEspecialidades().subscribe(e => { this.especialidades = e; this.cdr.detectChanges(); });
  }

  cargarDatos() {
    this.api.getDoctores().subscribe(d => { this.medicos = d; this.cdr.detectChanges(); });
  }

  // BUSCADOR BLINDADO
  get medicosFiltrados() {
    if (!this.medicos) return [];
    const f = (this.filtro || '').toLowerCase();
    return this.medicos.filter(m =>
      (m?.nombre || '').toLowerCase().includes(f) ||
      (m?.apellido || '').toLowerCase().includes(f) ||
      (m?.especialidad?.nombre || '').toLowerCase().includes(f)
    );
  }

  prepararNuevo() { this.editando = false; this.medicoForm.reset(); }
  prepararEditar(m: any) { this.editando = true; this.medicoSeleccionado = m; this.medicoForm.patchValue(m); }
  prepararEliminar(m: any) { this.medicoSeleccionado = m; }

  guardar() {
    if (this.medicoForm.invalid) return;
    const datosGuardar = this.medicoForm.value;
    if (this.editando && this.medicoSeleccionado) {
      this.api.updateDoctor(this.medicoSeleccionado.idDoctor, datosGuardar).subscribe(() => this.cargarDatos());
    } else {
      this.api.createDoctor(datosGuardar).subscribe(() => this.cargarDatos());
    }
  }

  confirmarEliminar() {
    if (this.medicoSeleccionado) {
      this.api.deleteDoctor(this.medicoSeleccionado.idDoctor).subscribe(() => this.cargarDatos());
    }
  }
}
