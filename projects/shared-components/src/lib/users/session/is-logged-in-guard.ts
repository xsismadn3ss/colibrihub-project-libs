import { CanMatchFn } from '@angular/router';
import {inject} from '@angular/core';
import {ValidationService} from 'colibrihub-shared-services';
import {catchError, map, of} from 'rxjs';

/**
 * Guard de tipo match para determinar si el usuario ha iniciado sesión
 * @param route
 * @param segments
 */
export const isLoggedInGuard: CanMatchFn = (route, segments) => {
  const validation = inject(ValidationService);

  return validation.validate().pipe(
    map(() => true),
    catchError(() => of(false))
  )
};
