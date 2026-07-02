import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. IMPORTA AMBOS MÓDULOS
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // 2. INYECTA AMBOS
  templateUrl: './horarios.html',
  styleUrls: ['./horarios.css']
})
export class HorariosComponent implements OnInit {
  horarios: any[] = [];
  doctores: any[] = [];
  doctorFiltro: string = "null"; // Variable para el ngModel
  horarioSeleccionado: any = null;
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  horarioForm: FormGroup;
  form: any = {};
  horariosMostrados: any[] = [];

  constructor(private api: ApiService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {
    this.horarioForm = this.fb.group({
      doctor: [null, Validators.required],
      diaSemana: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.api.getDoctores().subscribe(d => { this.doctores = d; this.cdr.detectChanges(); });
    this.cargarDatos();
  }

  cargarDatos() {
    this.api.getHorarios().subscribe(h => { this.horarios = h; this.cdr.detectChanges(); });
  }

  // 3. GETTER AUTOMÁTICO PARA HORARIOS
  get horariosFiltrados() {
    if (!this.horarios) return [];
    if (this.doctorFiltro === "null" || !this.doctorFiltro) return this.horarios;
    // Filtra comparando el ID del doctor
    return this.horarios.filter(h => h.doctor?.idDoctor == this.doctorFiltro);
  }

  prepararNuevo() { this.horarioForm.reset({ diaSemana: '' }); }
  prepararEliminar(h: any) { this.horarioSeleccionado = h; }

  guardar() {
    if (this.horarioForm.valid) {
      this.api.createHorario(this.horarioForm.value).subscribe(() => this.cargarDatos());
    }
  }

  confirmarEliminar() {
    if (this.horarioSeleccionado) {
      this.api.deleteHorario(this.horarioSeleccionado.idHorario).subscribe(() => this.cargarDatos());
    }
  }
}
