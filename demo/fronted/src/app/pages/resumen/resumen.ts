import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-resumen',
  standalone: true,
  imports: [RouterLink], 
  templateUrl: './resumen.html',
  styleUrls: ['./resumen.css']
})
export class ResumenComponent { }
