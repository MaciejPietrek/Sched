import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressElementComponent } from './progress-element.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressDirective } from './progress.directive';

@NgModule({
  declarations: [ProgressElementComponent, ProgressDirective],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [ProgressElementComponent, ProgressDirective],
})
export class ProgressElementModule {}
