import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormFactoryService {

  constructor(private fb:FormBuilder) { }

  loginFormFactory(){
    return this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


}
