import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevComponent } from './dev/dev.component';

@NgModule({
  declarations: [DevComponent],
  imports: [CommonModule],
  exports: [DevComponent],
})
export class DevModule {}
