import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horarios.html',
  styleUrls: ['./horarios.css']
})
export class HorariosComponent implements OnInit {
  // Las listas de datos
  dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  
  especialidades = [
    "Cirugía de Cabeza, Cuello y Maxilofacial", "Gastroenterología", "Medicina Interna", 
    "Traumatología", "Cardiología", "Terapia Física", "Anatomía Patológica", 
    "Medicina General", "Ginecología", "Cirugía General", "Urología", "Psicología", 
    "Otorrinolaringología", "Nutrición", "Reumatología", "Pediatría", "Oftalmología", 
    "Endocrinología", "Obstetricia", "Anestesiología", "Neurología", "Odontología", 
    "Cirugía de Tórax y Cardiovascular", "Cirugía Oncológica", "Medicina Física"
  ];

  medicos = [
    "Alcántara Diaz Manuel", "Aliaga Ramos Josue", "Asmat Ramírez Victor Arturo",
    "Basombrío Velasquez Jorge", "Bello Sedano Alexis Gustavo", "Brañes Chocña Diego",
    "Cabanillas Lapa Jose Luis", "Cabezas Davalos Engilvero", "Callo Trujillano Fredy Roland",
    "Canto Egoavil Stephanie Lee", "Chavez Blas Maria Angelica", "Chavez Leon Leslie Daysi",
    "Choquejahua Callo Freddy", "Chuan Venturo Daniel Francisco", "Davalos Prado Juan",
    "Davalos Ramirez Zoraida", "Florian Chachapoyas Alberto Giancarlo", "Fuentes Zacarías Thalia",
    "Gómez Peirano Iris Margarita", "Gros Marcela", "Hidalgo Camarena Otto G.",
    "Hoyos Guevara Sara Jesus", "Lazarte Mora Lucero", "Lector Argandoña Raul",
    "Léctor Argandoña Susy", "Li Flores Kelly Raquel", "Licetti Orestes",
    "Lopez Cajavilca Krystel Melany", "Lozano Beraun Ricardo", "Mamani Yancachajlla Rosalinda",
    "Menendez Loyola Monica Lucia", "Moreano Falcon Isabel", "Mucha Hurtado Thalia",
    "Muñoz Abanto Patricia Nelly", "Murga Ubillus Rita Isabel", "Ochoa Trigoso Julio Cesar",
    "Oscanoa Lagos Margot Mercedes", "Pintado Caballero Jose Belen", "Quiroz Huaman Jose Manuel",
    "Quispe Anquise Isabel Marlene", "Ramal Campomanes Juan Carlos", "Ramos Reyes Julio César",
    "Reyes Romero Lilliam Yudith", "Silva De Las Casas Mijail", "Soto Leonardo Ugaz",
    "Souza Galo Elba Eunice", "Torres Gil Luis Fernando", "Torres Lazon María Luisa",
    "Torres Lopez Marco Antonio", "Triveño Callalli Andy Jose", "Usnayo Tineo Romina",
    "Valderrama Rosario", "Zapata Torres Bernardino Roger"
  ];

  // El "cerebro" donde guardaremos las asignaciones
  asignaciones: any = {};

  // Formulario conectado con [(ngModel)]
  nuevoHorario = {
    medico: '',
    especialidad: '',
    dia: '',
    turno: ''
  };

  // Cuando arranca la página, preparamos la tabla vacía
  ngOnInit() {
    this.especialidades.forEach(esp => {
      this.asignaciones[esp] = {
        M: { 'Lunes': [], 'Martes': [], 'Miércoles': [], 'Jueves': [], 'Viernes': [], 'Sábado': [] },
        T: { 'Lunes': [], 'Martes': [], 'Miércoles': [], 'Jueves': [], 'Viernes': [], 'Sábado': [] }
      };
    });
  }

  // Agrega al médico al diccionario
  agregarMedico() {
    const { medico, especialidad, dia, turno } = this.nuevoHorario;
    
    if (medico && especialidad && dia && turno) {
      // Inyectamos al doctor en el arreglo correcto
      this.asignaciones[especialidad][turno][dia].push(medico);
      
      // Limpiamos el formulario
      this.nuevoHorario = { medico: '', especialidad: '', dia: '', turno: '' };
    }
  }
}