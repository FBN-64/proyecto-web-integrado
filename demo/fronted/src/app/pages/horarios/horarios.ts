import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './Horarios.html',
  styleUrls: ['./Horarios.css']
})
export class HorariosComponent implements OnInit {
  horarios: any[] = [];
  horariosMostrados: any[] = [];
  doctores: any[] = [];
  doctorFiltro: any = null;
  horarioSeleccionado: any = null;
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  horarioForm: FormGroup;

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
    this.api.getHorarios().subscribe(h => { this.horarios = h; this.filtrarPorDoctor(); this.cdr.detectChanges(); });
  }

  cambiarFiltroDoctor(event: any) {
    const id = event.target.value;
    this.doctorFiltro = id === "null" ? null : this.doctores.find(d => d.idDoctor == id);
    this.filtrarPorDoctor();
  }

  filtrarPorDoctor() {
    this.horariosMostrados = this.doctorFiltro
      ? this.horarios.filter(h => h.doctor?.idDoctor === this.doctorFiltro.idDoctor)
      : this.horarios;
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
