import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-medicos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './medicos.html',
  styleUrls: ['./medicos.css']
})
export class MedicosComponent implements OnInit {
  medicos: any[] = [];
  medicosMostrados: any[] = []; // <-- Lista visual que evita el congelamiento
  especialidades: any[] = [];
  filtro = '';
  editando = false;
  medicoSeleccionado: any = null;
  medicoForm: FormGroup; // <-- Formulario estricto (Miembro 3)

  constructor(private api: ApiService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.medicoForm = this.fb.group({
      // Se agregan los Validators.pattern para forzar solo letras
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]],
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
    this.api.getDoctores().subscribe(d => {
      this.medicos = d;
      this.aplicarFiltro(); // Sincroniza la tabla al cargar
      this.cdr.detectChanges();
    });
  }

  // BUSCADOR INMUNE A CAMBIOS DE PESTAÑA
  aplicarFiltro() {
    const f = (this.filtro || '').toLowerCase();
    this.medicosMostrados = this.medicos.filter(m =>
      (m?.nombre || '').toLowerCase().includes(f) ||
      (m?.apellido || '').toLowerCase().includes(f) ||
      (m?.especialidad?.nombre || '').toLowerCase().includes(f)
    );
  }

  prepararNuevo() {
    this.editando = false;
    this.medicoForm.reset(); // Limpia el formulario reactivo
  }

  prepararEditar(m: any) {
    this.editando = true;
    this.medicoSeleccionado = m;
    // Llena el modal con los datos exactos del médico
    this.medicoForm.patchValue({
      nombre: m.nombre,
      apellido: m.apellido,
      dni: m.dni,
      especialidad: m.especialidad,
      telefono: m.telefono,
      email: m.email,
      descripcionCorta: m.descripcionCorta
    });
  }

  prepararEliminar(m: any) { this.medicoSeleccionado = m; }

  guardar() {
    // El muro: Si faltan datos, avisa y no hace nada
    if (this.medicoForm.invalid) return;

    const datosGuardar = this.medicoForm.value;

    if (this.editando && this.medicoSeleccionado) {
      this.api.updateDoctor(this.medicoSeleccionado.idDoctor, datosGuardar).subscribe(() => {
        this.cargarDatos();
        document.getElementById('btn-cerrar-modal')?.click(); // Cierra el modal
      });
    } else {
      this.api.createDoctor(datosGuardar).subscribe(() => {
        this.cargarDatos();
        document.getElementById('btn-cerrar-modal')?.click(); // Cierra el modal
      });
    }
  }

  confirmarEliminar() {
    if (this.medicoSeleccionado) {
      this.api.deleteDoctor(this.medicoSeleccionado.idDoctor).subscribe(() => this.cargarDatos());
    }
  }
}
