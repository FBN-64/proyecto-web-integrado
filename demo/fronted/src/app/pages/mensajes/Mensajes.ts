import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.services';

@Component({ selector: 'app-mensajes', standalone: true, imports: [CommonModule, FormsModule], templateUrl: './Mensajes.html', styleUrls: ['./Mensajes.css'] })
export class MensajesComponent implements OnInit {
  mensajes: any[] = [];
  filtro = '';
  estado = 'pendientes';
  cargando = true;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}
  ngOnInit() { this.cargarDatos(); }

  cargarDatos() {
    this.cargando = true;
    this.api.getMensajes().subscribe(mensajes => { this.mensajes = mensajes ?? []; this.cargando = false; this.cdr.detectChanges(); });
  }

  get pendientes() { return this.mensajes.filter(m => !m.leido).length; }
  get leidos() { return this.mensajes.filter(m => m.leido).length; }

  get mensajesFiltrados() {
    const texto = this.filtro.trim().toLowerCase();
    return this.mensajes.filter(m => {
      const estadoOk = this.estado === 'todos' || (this.estado === 'pendientes' ? !m.leido : m.leido);
      const contenido = `${m.nombreCompleto ?? ''} ${m.email ?? ''} ${m.telefono ?? ''} ${m.motivoConsulta ?? ''} ${m.mensaje ?? ''}`.toLowerCase();
      return estadoOk && (!texto || contenido.includes(texto));
    }).sort((a, b) => new Date(b.fechaRecibido).getTime() - new Date(a.fechaRecibido).getTime());
  }

  marcarLeido(mensaje: any) {
    if (!mensaje?.idMensaje || mensaje.leido) return;
    this.api.marcarMensajeLeido(mensaje.idMensaje).subscribe(actualizado => { mensaje.leido = actualizado?.leido ?? true; this.cdr.detectChanges(); });
  }
}
