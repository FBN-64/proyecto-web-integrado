import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.css',
})
export class ConfiguracionComponent {}
