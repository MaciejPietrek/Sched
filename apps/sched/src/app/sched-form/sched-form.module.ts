import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { InputTextModule } from 'primeng/inputtext';
import { SchedFormComponent } from './sched-form.component';

@NgModule({
  declarations: [SchedFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, InputTextModule],
  exports: [SchedFormComponent],
})
export class SchedFormModule {}
