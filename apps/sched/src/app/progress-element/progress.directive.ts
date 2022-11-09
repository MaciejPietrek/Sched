import { Directive, ElementRef, Input } from '@angular/core';
import { ProgressElementService } from './progress-element.service';

const createLoaderElement = () => {
  const element = document.createElement('img');
  element.src = '/assets/loader.svg';
  element.alt = 'Loading';
  element.style.position = 'absolute';
  element.style.maxHeight = '100%';
  element.style.maxWidth = '100%';
  element.style.height = '50px';
  element.style.width = '50px';
  element.style.margin = 'auto';
  element.style.inset = '0px';
  // element.style.borderWidth = '2px';
  // element.style.borderStyle = 'solid';
  // element.style.borderColor = '#b2fcfc80';
  // element.style.background = '#b2fcfc80';
  return element;
};

const createWrapperElement = () => {
  const element = document.createElement('div');
  element.style.backgroundColor = '#fff4';
  element.style.position = 'absolute';
  element.style.inset = '0px';
  return element;
};

@Directive({
  selector: '[schedProgress]',
  exportAs: 'schedProgress',
  providers: [ProgressElementService],
})
export class ProgressDirective {
  private loader = createLoaderElement();
  private wrapper = createWrapperElement();
  private wrapperStyles = new Map<string, string>();

  @Input('styles') set setStyles(styles: Map<string, string>) {
    this.wrapperStyles.forEach((key) => this.wrapperStyles.set(key, ''));
    styles.forEach((key, value) => this.wrapperStyles.set(key, value));
    this.wrapperStyles.forEach(
      (key, value) => (this.wrapper.style[key as any] = value)
    );
  }

  constructor(
    public progress: ProgressElementService,
    private elementRef: ElementRef
  ) {
    const host = this.elementRef.nativeElement as HTMLElement;

    this.wrapper.appendChild(this.loader);

    host.style.position = 'relative';

    this.progress.toggled.subscribe((on) => {
      if (on) host.appendChild(this.wrapper);
      else host.removeChild(this.wrapper);
    });
  }
}
