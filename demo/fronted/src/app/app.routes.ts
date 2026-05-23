import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { LayoutComponent } from './dashboard/layout/layout';
import { ResumenComponent } from './pages/resumen/resumen';
import { MedicosComponent } from './pages/medicos/medicos';
import { EspecialidadComponent } from './pages/especialidad/especialidad';
import { HorariosComponent } from './pages/horarios/horarios';
import { CitasComponent } from './pages/citas/citas';
import { ConfiguracionComponent } from './pages/configuracion/configuracion';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: 'resumen', component: ResumenComponent },
      { path: 'medicos', component: MedicosComponent },
      { path: 'especialidad', component: EspecialidadComponent },
      { path: 'horarios', component: HorariosComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'configuracion', component: ConfiguracionComponent },
      { path: '', redirectTo: 'resumen', pathMatch: 'full' }
    ]
  }
];
