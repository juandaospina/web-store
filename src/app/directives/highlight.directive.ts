import { Directive, inject, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private _elementRef = inject(ElementRef);
  constructor() {}

  ngOnInit() {
    this._elementRef.nativeElement.style.backgroundColor = '#F2F4F9';
  }
}
