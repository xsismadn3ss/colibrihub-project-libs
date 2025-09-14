import {Component, isDevMode, OnInit} from '@angular/core';

/**
 * @component DevContainer
 * @description
 * Este componente renderiza contenido de forma condicional basado en si la aplicación se está ejecutando en modo de desarrollo o de producción.
 * Utiliza la función `isDevMode()` de Angular para determinar el entorno actual.
 *
 * @usageNotes
 * El componente `DevContainer` tiene dos puntos de proyección de contenido que se pueden usar con los selectores de atributos `dev` and `prod`.
 *
 * ### Ejemplo de uso:
 *
 * ```html
 * <dev>
 *   <div dev>
 *     <!-- Este contenido solo se mostrará en modo de desarrollo -->
 *     <h2>Modo de Desarrollo</h2>
 *     <p>Información útil para depuración...</p>
 *   </div>
 *   <div prod>
 *     <!-- Este contenido solo se mostrará en modo de producción -->
 *     <h2>Modo de Producción</h2>
 *   </div>
 * </dev>
 * ```
 */
@Component({
  selector: 'dev',
  imports: [],
  template: `
    @if (devMode){
      <ng-content select="[dev]"></ng-content>
    } @else{
      <ng-content select="[prod]"></ng-content>
    }
  `,
  styles: ``
})
export class DevContainer implements OnInit{
  /**
   * @property {boolean} devMode
   * @description
   * Un booleano que es `true` si la aplicación está en modo de desarrollo, y `false` en caso contrario.
   * Se inicializa usando `isDevMode()` en el hook `ngOnInit`.
   * @protected
   */
  protected devMode = true;

  ngOnInit() {
    this.devMode = isDevMode()
  }

}