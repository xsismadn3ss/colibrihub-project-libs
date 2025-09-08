# SharedServices

Librería de servicios compartidos para reutilizar lógica de negocio en
los módulos del proyecto. En esta librería la lógica 
de negocio está abstraída y permite agilizar el desarrollo de los equipos
al importar servicios y solo configurarlos mediante inyección de 
dependencias

> Este proyecto está diseñado para angular 20.2.0 o superior


## Configurando un Token
En el archivo ``app.config.ts`` configura los tokens para
conectar los servicios de la librería con los microservicios que se van a 
consumir. Los tokens son necesarios porque se inyectan en los servicios
y permiten asignarles un valor para que los servicios de la librería
los utilicen.

````ts
import { ApplicationConfig } from '@angular/core';

import {AUTH_SERVICE_URL} from '@xsismadn3ss/shared-dtos';
import {environment} from '../environments/environment.development';
import {provideHttpClient} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    /*
    ---
    Boilerplate providers
    ---
    */
    provideHttpClient(),
    // configurando token para URL del microservicio de autenticación
    {provide: AUTH_SERVICE_URL, useValue: environment.authURL}
  ]
};
````

Es recomendable que las variables de entorno para el proyecto se
guarden en un archivo ``environment.ts`` o ``environment.development.ts``.
Ejecuta ``ng generate environments`` para crear los archivos de variables
de entorno.

## Utilizar servicio
Puedes utilizar ``inject`` en Angular para inyectar el servicio
como dependencia en las funcionalidades que deseas implementar en el proyecto.

Inyectando servicio en un componente:
````ts
import { ValidationService } from 'colibrihub-shared-services';  
  
export class MiComponente {  
  private readonly validationService = inject(ValidationService);  
    
  // Usar el servicio  
  validarSesion() {  
    this.validationService.validate().subscribe(/* ... */);  
  }  
}
````

Inyectando servicio en un Guard:
````ts
import { ValidationService } from 'colibrihub-shared-services';

export const miGuard: CanActivateFn = () => {  
  const validationService = inject(ValidationService);  
  return validationService.validate().pipe(/* ... */);  
};
````
