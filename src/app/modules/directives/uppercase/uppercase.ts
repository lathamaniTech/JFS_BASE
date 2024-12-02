import { Directive, HostListener } from '@angular/core';
import { NgControl } from "@angular/forms";

/**
 * Generated class for the UppercaseDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[uppercase]' // Attribute selector
})
export class UppercaseDirective {

  constructor(private control : NgControl) {
  }

  @HostListener('input', ['$event']) onKeyUp(event) {
    var start = event.target['selectionStart'];
    var end = event.target['selectionEnd'];
    event.target['value'] = event.target['value'].toUpperCase();
    event.target.setSelectionRange(start, end);
  }

}
