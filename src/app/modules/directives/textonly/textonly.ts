import { Directive, HostListener, ElementRef } from '@angular/core';
import { NgControl } from "@angular/forms";
/**
 * Generated class for the TextonlyDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[textonly]' // Attribute selector
})
export class TextonlyDirective {

  PreviousValue: any = '';
  constructor(private ngControl: NgControl) {
  }

  @HostListener('keyup', ['$event.target.value']) removeData(value) {
    // var pattern =  /^([a-zA-Z]| )+$/;  
    var pattern = /^([a-zA-Z]+\s?)*$/
    if (value.search(pattern) == -1) {
      if (value == "") {
        this.ngControl.control.setValue("");
        this.PreviousValue = "";
      } else {
        this.ngControl.control.setValue(this.PreviousValue);
      }
    } else {
      this.ngControl.control.setValue(value);
      this.PreviousValue = value;
    }
  }

}


