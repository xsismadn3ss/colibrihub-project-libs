# SharedComponents

Esta librería tiene componentes reutilizables para añadir
funcionalidades y reutilizarlos en otros módulos.

> Esta librería está diseñada para Angular 20.0.2


## Instalación
```bash
npm install colibrihub-shared-components  
npm install colibrihub-shared-services
```

## Importar Componente

````ts
import { Auth } from 'colibrihub-shared-components';  
  
@Component({  
  selector: 'app-mi-componente',  
  imports: [Auth], // Importar el componente  
  template: `  
    <auth>  
      <div valid>  
        <h2>¡Bienvenido usuario autenticado!</h2>  
        <p>Este contenido solo se muestra si estás logueado</p>  
      </div>  
      <div invalid>  
        <h2>Acceso denegado</h2>  
        <p>Por favor inicia sesión para continuar</p>  
        <button>Iniciar Sesión</button>  
      </div>  
    </auth>  
  `  
})  
export class MiComponente {}
````

## Importar Guard
````ts
import { Routes } from '@angular/router';  
import { isLoggedInGuard, isLoggedOutGuard } from 'colibrihub-shared-components';  
  
export const routes: Routes = [  
  {  
    path: 'dashboard',  
    component: DashboardComponent,  
    canMatch: [isLoggedInGuard] // Solo se muestra si se ha iniciado sesión
  },  
  {  
    path: 'perfil',  
    component: PerfilComponent,  
    canMatch: [isLoggedOutGuard] // Solo se muestra si no ha iniciado sessión  
  },  
  {  
    path: 'publico',  
    component: PublicoComponent  
    // Sin guard - acceso libre  
  }  
];
````

## Configurar Tokens
Para hacer uso de los componentes debes configurar
los tokens que permiten que los servicios usados por los
componentes sean utilizados.

````ts
import { bootstrapApplication } from '@angular/platform-browser';  
import { AUTH_SERVICE_URL } from 'colibrihub-shared-services';  
  
bootstrapApplication(AppComponent, {  
  providers: [  
    { provide: AUTH_SERVICE_URL, useValue: 'https://tu-api-auth.com' },  
    // otros providers...  
  ]  
});
````
