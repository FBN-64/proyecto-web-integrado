import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-especialidad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './especialidad.html',
  styleUrls: ['./especialidad.css']
})
export class EspecialidadComponent implements OnInit {
  especialidades: any[] = [];
  especialidadesMostradas: any[] = [];
  especialidadSeleccionada: any = null;
  especialidadForm: FormGroup;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.especialidadForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() { this.cargarDatos(); }

  cargarDatos() {
    this.api.getEspecialidades().subscribe(e => {
      this.especialidades = e;
      this.especialidadesMostradas = e;
      this.cdr.detectChanges();
    });
  }

  filtrar(event: any) {
    const f = (event.target.value || '').toLowerCase();
    this.especialidadesMostradas = this.especialidades.filter(e =>
      (e?.nombre || '').toLowerCase().includes(f)
    );
  }

  guardar() {
    if (this.especialidadForm.invalid) return;
    this.api.createEspecialidad(this.especialidadForm.value).subscribe(() => {
      this.cargarDatos();
      this.especialidadForm.reset();
    });
  }

  prepararEliminar(e: any) { this.especialidadSeleccionada = e; }

  confirmarEliminar() {
    if (this.especialidadSeleccionada) {
      this.api.deleteEspecialidad(this.especialidadSeleccionada.idEspecialidad).subscribe(() => this.cargarDatos());
    }
  }
}
