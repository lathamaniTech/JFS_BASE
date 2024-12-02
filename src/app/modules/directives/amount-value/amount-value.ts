import { Directive, HostListener } from '@angular/core';
import { NgControl } from "@angular/forms";

/**
 * Generated class for the AmountValueDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[amount-value]' // Attribute selector
})
export class AmountValueDirective {
  PreviousValue:any='';
  constructor(private ngControl: NgControl) {
    console.log('Hello AmountValueDirective Directive');
  }
  @HostListener('keyup',['$event.target.value']) removeData(value){
   
    var pattern = /^[1-9][0-9]*$/; 
    if(value.search(pattern) == -1){
      if(value == ""){
        this.ngControl.control.setValue("");
        this.PreviousValue = "";
      }else{
        this.ngControl.control.setValue(this.PreviousValue);
      }
    }else{  
       this.ngControl.control.setValue(value); 
       this.PreviousValue = value;
    }
  }
}
