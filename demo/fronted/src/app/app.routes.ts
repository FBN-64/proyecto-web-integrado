import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { RegisterComponent } from './auth/register/register';
import { LayoutComponent } from './dashboard/layout/layout';
import { ResumenComponent } from './pages/resumen/resumen';
import { MedicosComponent } from './pages/medicos/medicos';
import { EspecialidadComponent } from './pages/especialidad/especialidad';
import { HorariosComponent } from './pages/horarios/horarios';
import { CitasComponent } from './pages/citas/citas';
import { PacientesComponent } from './pages/pacientes/Pacientes';
import { PagosComponent } from './pages/pagos/Pagos';
import { MensajesComponent } from './pages/mensajes/Mensajes';
import { ConfiguracionComponent } from './pages/configuracion/configuracion';
import { authGuard } from './guards/auth.guard';
import { Pagina404 } from './pages/pagina404/pagina404';
import { Perfil } from './pages/configuracion/perfil/perfil';
import { Seguridad } from './pages/configuracion/seguridad/seguridad';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      { path: 'resumen', component: ResumenComponent },
      { path: 'medicos', component: MedicosComponent },
      { path: 'especialidad', component: EspecialidadComponent },
      { path: 'horarios', component: HorariosComponent },
      { path: 'citas', component: CitasComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'pagos', component: PagosComponent },
      { path: 'mensajes', component: MensajesComponent },
      {
        path: 'configuracion',
        component: ConfiguracionComponent,
        children: [
          { path: '', redirectTo: 'perfil', pathMatch: 'full' },
          { path: 'perfil', component: Perfil },
          { path: 'seguridad', component: Seguridad }
        ]
      }
    ]
  },
  { path: '**', component: Pagina404 }
]

