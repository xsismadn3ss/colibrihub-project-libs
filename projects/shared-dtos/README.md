# Shared DTOs
DTOs públicos para reutilizar en los módulos del sistema. En este paquete
están los esquemas de los datos que se manejan en el proyecto al realizar
peticiones, asi como las respuestas de las peticiones.

> Nota: Esta librería está diseñada para trabajar con Angular 20.0.2

## Instalación
````bash
npm install colibrihub-shared-dtos
````

## Importando esquemas

En esta librería se usan interfaces para representar a los DTO,
esto permite usarlos para agregar notaciones a los objetos
javascript y sabes que propiedades se deben definir.

````ts
import {LoginDto} from "colibrihub-shared-dtos";

// usando un esquema
const data = {
  username: '<USERNAME>',
  password: '<PASSWORD>'
} as LoginDto
````
