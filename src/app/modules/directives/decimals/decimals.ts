import { AfterViewInit, Directive, HostListener } from '@angular/core';
import { NgControl } from "@angular/forms";

/**
 * Generated class for the DecimalsDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[decimals]' // Attribute selector
})
export class DecimalsDirective{
  PreviousValue: any = '';
  constructor(public ngControl: NgControl) {
    console.log('Hello DecimalsDirective Directive deciamal');
  }

  @HostListener('keyup', ['$event.target.value']) removeData(value) {
    //  var pattern =/^(\d+\.\d{1,2})$/;
    console.log('Hello DecimalsDirective Directive deciamal');
    var pattern = /^([0-9]{1}||[0-9]{2}||[0-9]{1}[.][0-9]{1}||[0-9]{2}[.][0-9]{1})$/;
    if (value.search(pattern) == -1) {
      console.log("if else", value);
      if (value == "") {
        this.ngControl.control.setValue("");
        this.PreviousValue = "";
      } else {
        this.ngControl.control.setValue(this.PreviousValue);
      }
    } else {
      // this.ngControl.control.setValue(value);
      // this.PreviousValue = value;
        console.log("last digit else", value);
        this.ngControl.control.setValue(value);
        this.PreviousValue = value;
    }
  }


}
