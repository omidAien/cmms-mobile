import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[mapDesignView]'
})
export class DesignViewDirective {

  constructor(private element: ElementRef<any>, private render2: Renderer2) { }

  @Input("mapDesignView") set designView(operationsLength: number) {

    const width:number = this.element.nativeElement.clientWidth;
    const baseColumnGap = 10;
    let columnNumber: number = 3;
    let columnGapCalculated:number = 0;
    let claculatedColumnsValue:string = null;
    let claculatedRowsValue:string = null;
    let rowCount:number;

    columnNumber = ( width <= 648 ) ? 3 : 4;

    if ( width <= 648 ) {
      columnNumber = 3;
    }
    else if ( width <= 1000 ) {
      columnNumber = 4;
    }
    else if ( width <= 1366 ) {
      columnNumber = 8;
    }

    columnGapCalculated = ( columnNumber - 1 ) * baseColumnGap;
    rowCount = Math.ceil(operationsLength / columnNumber);
    claculatedColumnsValue = `repeat(${columnNumber}, calc((100% - ${columnGapCalculated}px) / ${columnNumber}))`;
    claculatedRowsValue = `repeat(${rowCount}, 105px)`;

    this.render2.setStyle(this.element.nativeElement, "gridTemplateColumns", claculatedColumnsValue);
    this.render2.setStyle(this.element.nativeElement, "gridTemplateRows", claculatedRowsValue);

  }

}
