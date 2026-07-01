import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ApiService } from '../services/api.services';

export const authGuard: CanActivateFn = () => {
  const api = inject(ApiService);
  const router = inject(Router);

  return api.me().pipe(
    map(usuario => {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      return true;
    }),
    catchError(() => {
      localStorage.removeItem('usuario');
      router.navigate(['/login']);
      return of(false);
    })
  );
};
