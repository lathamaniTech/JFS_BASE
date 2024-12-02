import { Directive, HostListener } from '@angular/core';
import { NgControl } from "@angular/forms";

/**
 * Generated class for the AddressonlyDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[addressonly]' // Attribute selector
})
export class AddressonlyDirective {
  PreviousValue:any='';
  constructor(private ngControl: NgControl) {
  }
  @HostListener('keyup',['$event.target.value']) removeData(value){
    var pattern =  /^([a-zA-Z0-9,-./&#()]+\s?)*$/;
     //var pattern = /^[a-zA-Z0-9,-/&.]*$/;
    if(value.search(pattern) == -1){
      if(value == ""){
        this.ngControl.control.setValue("");
        this.PreviousValue = "";
      }else{
        this.ngControl.control.setValue(this.PreviousValue);
      }
    }else {
      let str1: any;
      let str2: any;
      str1 = value.substr(value.length - 1);
      str2 = value.substr(value.length - 2);
      str2 = str2.slice(0, 1);
      if (str1 == '.' && str2 == '.' || str1 == '/' && str2 == '/' || str1 == '&' && str2 == '&' || str1 == ',' && str2 == ',' || str1 == '-' && str2 == '-' || str1 == '#' && str2 == '#') {
        this.ngControl.control.setValue(this.PreviousValue);
      }
      else {
        this.ngControl.control.setValue(value);
        this.PreviousValue = value;
      }
    }
   }
}
