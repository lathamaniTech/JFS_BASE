import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataPassingService {
 
    constructor( public alertCtrl: AlertController, public toastCtrl: ToastController, 
      public loadingCtrl: LoadingController ) {
    }


  }
