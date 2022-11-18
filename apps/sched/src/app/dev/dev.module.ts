import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DevComponent } from './dev/dev.component';

@NgModule({
  declarations: [DevComponent],
  imports: [CommonModule],
  exports: [DevComponent],
})
export class DevModule {}
