import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { DataPassingService } from '../dataPassing/data-passing.service';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import * as AppTypes from '../../Utility/AppInterfaces';
import * as AppConst from '../../Utility/AppConstants';
import { AlertLables } from 'src/app/Utility/AlertLables';

@Injectable({
  providedIn: 'root'
})

export class GlobalFunctionsService {
  sys_token: string;
  _sk = "sysarc@1234INFO@"
  CryptoJS: any;
  _sqlObj: any;
  private _loading: any;

  constructor(public dataPassing: DataPassingService, public http: HTTP, 
    public device: Device, public platform: Platform,
    public alertLabel: AlertLables, public alertCtrl: AlertController, 
    public toastCtrl: ToastController, 
    public loadingCtrl: LoadingController) { 
  }

  getCertPinningStatus(checkType) {
    return new Promise((resolve, reject) => {
      this.http.setServerTrustMode(checkType).then(
        (data) => {
          resolve(true);
        },
        (error) => {
          reject(false);
        }
      );
    });
  }

  genToken() {
    let timestamp = new Date().getTime();
    let RanNum = Math.floor(Math.random() * 90000000) + 10000000;
    this.sys_token = (timestamp.toString()) + "_" + (RanNum.toString());
    return this.sys_token;
  }

  encMyReq(val) {
    if (val != "" && val != null && val != undefined) {
      let encryptedMessage = CryptoJS.AES.encrypt(val, this._sk);
      return encryptedMessage.toString();
    }
  }

  encryptMyReq(val) {
    if (val != "" && val != null && val != undefined) {
      let encryptedMessage = CryptoJS.AES.encrypt(JSON.stringify(val), this._sk);
      let req = { data: encryptedMessage.toString() }
      return req;
    }
  }

  decryptMyRes(val) {
    if (val != "" && val != null && val != undefined) {
      if (val.data != "" && val.data != null && val.data != undefined) {
        var decryptedBytes = CryptoJS.AES.decrypt(val.data, this._sk);
        // console.log(decryptedBytes);
        if (decryptedBytes) {
          try {
            var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
            val.data = decryptedMessage;
            return val;
          } catch (err) {
            console.log(err);
          }
        }
      }
      else {
        this.globalLodingDismiss();
        this.presentAlert({title:this.alertLabel.AlertsText.alert, message:this.alertLabel.AlertsText.decryptError});
      }
    }
  }

  convertBlobtoKb(blob) {
    let size = (blob / (1024))
    size.toFixed(2);
    if (+size < 105) {
      return true;
    } else {
      return false;
    }
  }

  getDeviceId() {
    return this.device.uuid;
  }

  setGlobalSQLiteObj(val) {
    this._sqlObj = val;
  }
  getGlobalSQLiteObj() {
    return this._sqlObj;
  }

  async checkPermission() {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          const permission = await Geolocation.checkPermissions();
          if (permission) {
            this.platform.ready().then(() => {
              this.globalLodingPresent(this.alertLabel.LoadingText.fetch);
              navigator.geolocation.getCurrentPosition((success) => {
                console.log(success);
                this.globalLodingDismiss();
                resolve({ lat: success.coords.latitude, long: success.coords.longitude });
              }, error => {
               this.globalLodingDismiss();
                this.presentAlert({title:this.alertLabel.AlertsText.alert, message:error ? error.message : 'Time out'});
                console.log(error)
              }, { maximumAge: 30000, timeout: 30000, enableHighAccuracy: true });
            })
          }
        } catch (error) {
          if (error.message == "Location services are not enabled") {
            this.presentAlert({title:this.alertLabel.AlertsText.alert, message:this.alertLabel.AlertsText.locationOn});
          }
        }
      })
    } catch (error) {
      this.presentAlert({title:this.alertLabel.AlertsText.alert, message:JSON.stringify(error)});
    }
  }

  async presentAlert(option:AppTypes.AlertOption) {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
        header: option.title,
        subHeader: option.subTitle,
        message: option.message ? option.message : "",
        backdropDismiss: option.backDrop? option.backDrop : true,
        cssClass:option.className,
        buttons: [
          {
            text: option.confirm? option.confirm : this.alertLabel.AlertsText.ok,
            role: 'ok',
            handler: () => {
              resolve('yes');
            },
          },
        ],
      });
      await alert.present();
    });
  }

  // async presentAlert(title: string, subTitle: string, msg?: string) {
  //   const alert = await this.alertCtrl.create({
  //     header: title,
  //     subHeader: subTitle,
  //     message: msg ? msg : "",
  //     buttons: ['OK'],
  //     backdropDismiss: false
  //   });
  //   await alert.present();
  // }

  // async proccedFurtherAlert(title:string, subtitle:string, msg?: string) {
  //   return new Promise(async (resolve, reject) => {
  //     let alert = await this.alertCtrl.create({
  //       header: title,
  //       subHeader: subtitle,
  //       backdropDismiss: false,
  //       cssClass: 'alertBox',
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel',
  //           handler: () => {
  //             resolve('no');
  //           },
  //         },
  //         {
  //           text: 'Ok',
  //           role: 'ok',
  //           handler: () => {
  //             resolve('yes');
  //           },
  //         },
  //       ],
  //     });
  //     await alert.present();
  //   });
  // }

  async globalLodingPresent(msg:string, time?:number) {
    this._loading = true;
    return await this.loadingCtrl
      .create({
        message: msg,
        duration: time? time : 1000,
        spinner: 'circles',
        cssClass: 'custom-loading',
      })
      .then((a) => {
        a.present().then(() => {
          if (!this._loading) {
            a.dismiss().then(() => console.log('abort presenting'));
          }
        });
      });
  }

  async globalLodingDismiss() {
    this._loading = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => console.log('dismissed'));
  }

  // globalLodingDismissAll() {
  //   this._loading.dismissAll();
  // }

  confirmationAlert(option:AppTypes.AlertOption): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
        header: option.title,
        subHeader: option.subTitle,
        message:option.message,
        cssClass: option.className,
        backdropDismiss: option.backDrop,
        buttons: [
          {
            text: option.cancel? option.cancel : this.alertLabel.AlertsText.cancel,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve('No');
            },
          },
          {
            text: option.confirm? option.confirm : this.alertLabel.AlertsText.ok,
            role: 'ok',
            handler: () => {
              resolve('Yes');
            },
          },
        ],
      });
      alert.present();
    });
  }

  async presentToastbottom(value:string, positionVal?) {
    const toast = await this.toastCtrl.create({
      message: value,
      duration: 2000,
      position: positionVal ? positionVal : AppConst.ToastPosition.bottom
    });
    toast.present();
  }

}
