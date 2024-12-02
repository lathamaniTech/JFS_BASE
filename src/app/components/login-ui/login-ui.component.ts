import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFactoryService } from 'src/app/providers/form-factory.service';

@Component({
  selector: 'app-login-ui',
  templateUrl: './login-ui.component.html',
  styleUrls: ['./login-ui.component.scss'],
})
export class LoginUIComponent  implements OnInit {

  @ViewChild('loginDiv') logindiv: ElementRef;
  version: number =0;
  loginForm:FormGroup;

  constructor(private formFactory: FormFactoryService, 
    // private render:Renderer2
  ) {
   }

  ngOnInit() {
    this.loginForm = this.formFactory.loginFormFactory();
  }

  login() {
    console.log("login");
    // this.global.getDeviceId();
  }

  openAuditLogs() {
    console.log("openAuditLogs");
  }


}

