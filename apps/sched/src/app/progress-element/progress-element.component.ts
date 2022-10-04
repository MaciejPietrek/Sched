import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressElementService } from './progress-element.service';

@Component({
  selector: 'sched-progress-element',
  templateUrl: './progress-element.component.html',
  styleUrls: ['./progress-element.component.scss'],
  providers: [ProgressElementService],
})
export class ProgressElementComponent implements OnInit, OnDestroy {
  private progressSub?: Subscription;
  constructor(
    public progress: ProgressElementService,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.progressSub = this.progress.toggled.subscribe((on) => {
      if (on) this.elementRef.nativeElement.classList.add('show');
      else this.elementRef.nativeElement.classList.remove('show');
    });
  }
  ngOnDestroy(): void {
    this.progressSub?.unsubscribe();
  }
}
