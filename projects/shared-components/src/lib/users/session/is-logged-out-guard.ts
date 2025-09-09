import { CanMatchFn } from '@angular/router';
import {inject} from '@angular/core';
import {ValidationService} from 'colibrihub-shared-services';
import {catchError, map, of} from 'rxjs';

export const isLoggedOutGuard: CanMatchFn = (route, segments) => {
  const validation = inject(ValidationService)

  return validation.validate().pipe(
    map(()=> false),
    catchError(()=> of(true))
  )
};
