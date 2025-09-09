import { CanMatchFn } from '@angular/router';
import {inject} from '@angular/core';
import {ValidationService} from 'colibrihub-shared-services';
import {catchError, map, of} from 'rxjs';

/**
 * Guard de tipo match para determinar si el usuario **no** ha iniciado sesión
 * @param route
 * @param segments
 */
export const isLoggedOutGuard: CanMatchFn = (route, segments) => {
  const validation = inject(ValidationService)

  return validation.validate().pipe(
    map(()=> false),
    catchError(()=> of(true))
  )
};
