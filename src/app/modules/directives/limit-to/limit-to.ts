import { Directive, Input, HostListener } from '@angular/core';
import { NgControl } from "@angular/forms";
/**
 * Generated class for the LimitToDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[limit-to]' // Attribute selector
})
export class LimitToDirective {
  PreviousValue:any='';
  @Input('limit-to') limitTo;
  
    constructor(private ngControl: NgControl) {
  
    }
    //HostListener decorator handle event handlers for input (onKeyPress)
    @HostListener('keyup', ['$event'])
    onkeypress(ev) {
      const limit = +this.limitTo; //convert to number
      // once it reaches the limit set, stop propgating event.
      if (ev.target.value.length > limit) {
        //ev.preventDefault();
        this.ngControl.control.setValue(this.PreviousValue);
      }
      else{
        this.ngControl.control.setValue(ev.target.value); 
        this.PreviousValue = ev.target.value;
      }

    }
}
