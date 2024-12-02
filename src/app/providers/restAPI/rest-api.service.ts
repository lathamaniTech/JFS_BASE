import { BehaviorSubject } from 'rxjs';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { GlobalFunctionsService } from '../globalfunctions/global-functions.service';
import { DataPassingService } from '../dataPassing/data-passing.service';
import { environment } from 'src/environments/environment';
import { SqliteService } from '../sqlite/sqlite.service';
import { AlertErrorLabel } from 'src/utility/AlertErrorLabel';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = environment.apiURL;
  patch = environment.patch;
  public uploadProgress: BehaviorSubject<number> = new BehaviorSubject(0);
  public downloadProgress: BehaviorSubject<number> = new BehaviorSubject(0);

  dateTime = new Date();
  version: string;

  constructor(public http: HTTP, public dataPassing: DataPassingService, 
    public global: GlobalFunctionsService,
    public sqlite: SqliteService, public network: Network, 
    public alertErrorLabel: AlertErrorLabel,
   ) {
  }

  restApiCall(method:string, data:Record<string, string | number | any>, isKarza?:string): any {
    if (this.network.type == 'none' || this.network.type == "unknown") {
      this.global.presentAlert(this.alertErrorLabel.AlertLabels.alert, this.alertErrorLabel.AlertLabels.Enable_Internet);
      this.global.globalLodingDismiss();
    } else {
      let link:string;
      if (isKarza == 'Y') {
        link = this.apiURL + `lendperfect/kaarza/${method}`;
      } else {
        link = this.apiURL + `lendperfect/LOSMobileRestServices/${method}`;
      }
      this.http.setDataSerializer("json");
      let token = this.global.genToken();
      let headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "token": this.global.encMyReq(token),
        "deviceId": this.global.encMyReq(this.global.getDeviceId())
      }
      let encryptData = this.global.encryptMyReq(data);
      let curDateTime = moment(this.dateTime).format("YYYY-MM-DD HH:mm:ss");
      if (method == "finalSubmission") {
        var exceptDocument = JSON.parse(JSON.stringify(data));
        exceptDocument.LeadMain.Lead.ApplicantDetails[0].AppImage = '';
        exceptDocument.LeadMain.Lead.CoApplicantDetails.length ? exceptDocument.LeadMain.Lead.CoApplicantDetails[0].CoappAppImage = "" : exceptDocument.LeadMain.Lead.CoApplicantDetails;
        this.sqlite.addAuditTrail(curDateTime, link, method + " Request", JSON.stringify(exceptDocument));
      } else {
        if (method != "LoginDocument" && method != "UploadDocs") {
          this.sqlite.addAuditTrail(curDateTime, link, method + " Request", JSON.stringify(data));
        }
      }
      return new Promise((resolve, reject) => {
        this.global.getCertPinningStatus().then(data => {
          if (data == true) {
            // console.log("api link", link)
            // console.log("api encryptData", encryptData)
            // console.log("api headers", headers)
            this.http.post(link, encryptData, headers).then(response => {
              let decryRes = this.global.decryptMyRes(JSON.parse(response['data']));
              console.log(response, "response");
              this.sqlite.addAuditTrail(curDateTime, link, method + " Response", JSON.stringify(decryRes));
              resolve(JSON.parse(decryRes.data));
            }, error => {
              reject(error);
              console.log(error, "error");
               this.global.globalLodingDismiss();
               this.global.presentAlert(this.alertErrorLabel.AlertLabels.alert, error);
              this.sqlite.addAuditTrail(curDateTime, link, method + " Error Response", JSON.stringify(error));
            })
          } else {
             this.global.globalLodingDismiss();
             this.global.presentAlert(this.alertErrorLabel.AlertLabels.alert, this.alertErrorLabel.AlertLabels.Certificates_Pinning_Error);
          }
        })
      })
    }
  }

  resetProgress() {
    this.uploadProgress.next(0);
    this.downloadProgress.next(0);
  }

}

