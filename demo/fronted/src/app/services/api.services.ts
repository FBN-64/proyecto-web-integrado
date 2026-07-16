import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = 'https://api-madre-zoraida.onrender.com/api';
  private options = { withCredentials: true };

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.base}/auth/login`, { username, password }, this.options);
  }

  register(datos: any): Observable<any> {
    return this.http.post(`${this.base}/auth/register`, datos, this.options);
  }

  me(): Observable<any> {
    return this.http.get(`${this.base}/auth/me`, this.options);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.base}/auth/logout`, {}, this.options);
  }

  getDoctores(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/doctores`, this.options); }
  createDoctor(d: any): Observable<any> { return this.http.post(`${this.base}/doctores`, d, this.options); }
  updateDoctor(id: number, d: any): Observable<any> { return this.http.put(`${this.base}/doctores/${id}`, d, this.options); }
  deleteDoctor(id: number): Observable<any> { return this.http.delete(`${this.base}/doctores/${id}`, this.options); }

  getEspecialidades(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/especialidades`, this.options); }
  createEspecialidad(e: any): Observable<any> { return this.http.post(`${this.base}/especialidades`, e, this.options); }
  updateEspecialidad(id: number, e: any): Observable<any> { return this.http.put(`${this.base}/especialidades/${id}`, e, this.options); }
  deleteEspecialidad(id: number): Observable<any> { return this.http.delete(`${this.base}/especialidades/${id}`, this.options); }

  getPacientes(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/pacientes`, this.options); }
  createPaciente(p: any): Observable<any> { return this.http.post(`${this.base}/pacientes`, p, this.options); }
  updatePaciente(id: number, p: any): Observable<any> { return this.http.put(`${this.base}/pacientes/${id}`, p, this.options); }
  deletePaciente(id: number): Observable<any> { return this.http.delete(`${this.base}/pacientes/${id}`, this.options); }

  getCitas(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/citas`, this.options); }
  createCita(c: any): Observable<any> { return this.http.post(`${this.base}/citas`, c, this.options); }
  updateCita(id: number, c: any): Observable<any> { return this.http.put(`${this.base}/citas/${id}`, c, this.options); }
  deleteCita(id: number): Observable<any> { return this.http.delete(`${this.base}/citas/${id}`, this.options); }

  getHorarios(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/horarios`, this.options); }
  getHorariosByDoctor(idDoctor: number): Observable<any[]> { return this.http.get<any[]>(`${this.base}/horarios/doctor/${idDoctor}`, this.options); }
  createHorario(h: any): Observable<any> { return this.http.post(`${this.base}/horarios`, h, this.options); }
  deleteHorario(id: number): Observable<any> { return this.http.delete(`${this.base}/horarios/${id}`, this.options); }

  getPagos(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/pagos`, this.options); }
  createPago(p: any): Observable<any> { return this.http.post(`${this.base}/pagos`, p, this.options); }
  deletePago(id: number): Observable<any> { return this.http.delete(`${this.base}/pagos/${id}`, this.options); }

  getMensajes(): Observable<any[]> { return this.http.get<any[]>(`${this.base}/mensajes`, this.options); }
  createMensaje(m: any): Observable<any> { return this.http.post(`${this.base}/mensajes`, m, this.options); }
  marcarMensajeLeido(id: number): Observable<any> { return this.http.put(`${this.base}/mensajes/${id}/leido`, {}, this.options); }
}
