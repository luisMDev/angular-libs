import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  @Output() public clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:mousedown', ['$event'])
  public onClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event?.target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
