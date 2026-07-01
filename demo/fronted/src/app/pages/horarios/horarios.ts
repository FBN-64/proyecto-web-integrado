import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Horarios.html',
  styleUrls: ['./Horarios.css']
})
export class HorariosComponent implements OnInit {
  horarios: any[] = [];
  horariosMostrados: any[] = [];
  doctores: any[] = [];
  doctorSeleccionado: any = null;
  horarioSeleccionado: any = null;
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  form = { doctor: null as any, diaSemana: '', horaInicio: '', horaFin: '' };

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getDoctores().subscribe(d => { this.doctores = d; this.cdr.detectChanges(); });
    this.cargarDatos();
  }

  cargarDatos() {
    this.api.getHorarios().subscribe(h => { this.horarios = h; this.horariosMostrados = h; this.cdr.detectChanges(); });
  }

  filtrarPorDoctor() {
    this.horariosMostrados = this.doctorSeleccionado
      ? this.horarios.filter(h => h.doctor?.idDoctor === this.doctorSeleccionado.idDoctor)
      : this.horarios;
  }

  prepararNuevo() { this.form = { doctor: null, diaSemana: '', horaInicio: '', horaFin: '' }; }
  prepararEliminar(h: any) { this.horarioSeleccionado = h; }

  guardar() {
    if (this.form.doctor && this.form.diaSemana) {
      this.api.createHorario(this.form).subscribe(() => this.cargarDatos());
    }
  }

  confirmarEliminar() {
    if (this.horarioSeleccionado) {
      this.api.deleteHorario(this.horarioSeleccionado.idHorario).subscribe(() => this.cargarDatos());
    }
  }
}