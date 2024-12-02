import { Directive, HostListener } from '@angular/core';
import { NgControl } from "@angular/forms";
/**
 * Generated class for the NumberonlyDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[numberonly]' // Attribute selector
})
export class NumberonlyDirective {

  PreviousValue:any='';
  constructor(private ngControl: NgControl) {
  }

  @HostListener('keyup',['$event.target.value']) removeData(value){
       var pattern = /^[0-9]*$/; 
      if(value.search(pattern) == -1){
        if(value == ""){
          this.ngControl.control.setValue("");
          this.PreviousValue = "";
        }else{
          if(value == "") {
            this.ngControl.control.setValue(this.PreviousValue);
          } else {
            this.ngControl.control.setValue(value.substring(0, value.length -1));
          }

        }
      }else{  
         this.ngControl.control.setValue(value); 
         this.PreviousValue = value;
      }
    }

}
