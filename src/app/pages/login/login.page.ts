import { Component, OnInit } from '@angular/core';
import { GlobalFunctionsService } from 'src/app/providers/globalfunctions/global-functions.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  constructor(private global: GlobalFunctionsService) {
   }

  ngOnInit() {
  }


}
