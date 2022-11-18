import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProgressElementComponent } from './progress-element.component';
import { ProgressDirective } from './progress.directive';

@NgModule({
  declarations: [ProgressElementComponent, ProgressDirective],
  imports: [CommonModule, MatProgressSpinnerModule],
  exports: [ProgressElementComponent, ProgressDirective],
})
export class ProgressElementModule {}
