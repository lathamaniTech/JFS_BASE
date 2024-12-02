import { Directive, HostListener } from '@angular/core';
import { NgControl } from "@angular/forms";

/**
 * Generated class for the AlphanumericSpaceDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[alphanumeric-space]' // Attribute selector
})
export class AlphanumericSpaceDirective {
  PreviousValue:any='';
  constructor(private ngControl: NgControl) {
  }
  @HostListener('keyup',['$event.target.value']) removeData(value){

    var pattern = /^([a-zA-Z0-9]+\s?)*$/;
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