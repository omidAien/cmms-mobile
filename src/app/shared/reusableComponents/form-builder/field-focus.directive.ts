import { Directive, ElementRef, Input } from '@angular/core';
import { FormFieldControlTypes } from '../../formFieldControlTypes/ControlTypes';

@Directive({
  selector: '[mapFieldFocus]'
})
export class FieldFocusDirective {

  constructor(private elementRef: ElementRef) { }

  @Input("mapFieldFocus") set addFocusAttribute(controlType: number) {

    if ( controlType === FormFieldControlTypes.barcode ) {

      this.elementRef.nativeElement.focus();

    }

  }

}
