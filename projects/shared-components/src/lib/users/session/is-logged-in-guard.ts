import { CanMatchFn } from '@angular/router';
import {inject} from '@angular/core';
import {ValidationService} from 'colibrihub-shared-services';
import {catchError, map, of} from 'rxjs';


export const isLoggedInGuard: CanMatchFn = (route, segments) => {
  const validation = inject(ValidationService);

  return validation.validate().pipe(
    map(() => true),
    catchError(() => of(false))
  )
};
