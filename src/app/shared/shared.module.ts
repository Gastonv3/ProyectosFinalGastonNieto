import { NgModule } from '@angular/core';
import { Size20Directive } from './directive/size20.directive';
import { NombreCompletoPipe } from './pipe/nombre-completo.pipe';

@NgModule({
  declarations: [NombreCompletoPipe, Size20Directive],
  imports: [],
  providers: [],
  exports: [NombreCompletoPipe, Size20Directive],
})
export class SharedModule {}
