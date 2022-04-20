import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[mapFieldAutocomplete]'
})
export class FieldAutocompleteDirective {

  constructor(private elementRef: ElementRef) { 

    this.elementRef.nativeElement.autocomplete="off";

  }

}
