import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {ValidationService} from 'colibrihub-shared-services';
import {catchError, map, of} from 'rxjs';

export const validationGuard: CanActivateFn = () => {
  const validationService = inject(ValidationService)
  return validationService.validate().pipe(
    map(()=> true),
    catchError(()=> of(false))
  )
};
