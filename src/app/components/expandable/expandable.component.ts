import { Component, Input, ViewChild, ElementRef , OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {

  @ViewChild('expandWrapper', {read: ElementRef}) expandWrapper;
    @Input('expanded') expanded;
    @Input('expandHeight') expandHeight;
 
  constructor(public renderer: Renderer2) {
  }

   ngAfterViewInit(){
        // this.renderer.selectRootElement(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');   
        this.renderer.setStyle(this.expandWrapper.nativeElement, 'height', this.expandHeight + 'px');   
    }

  ngOnInit() {}

}
