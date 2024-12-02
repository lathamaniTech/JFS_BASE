import { Injectable } from '@angular/core';
import * as X2JS from 'x2js';
import * as moment from 'moment';
import { GlobalFunctionsService } from '../globalfunctions/global-functions.service';
import { DataPassingService } from '../dataPassing/data-passing.service';
import { SqliteService } from '../sqlite/sqlite.service';
import { AlertErrorLabel } from 'src/utility/AlertErrorLabel';
declare var EsysRDService;
declare var EsysRDServiceL0;
declare var RDService;
declare var MRDService;
var capturexml = "";

@Injectable({
  providedIn: 'root'
})

export class BioNavigatorService {
  aadharNum: any;
  ekycUrl: any;
  BTName: string;
  BTAddress: string;
  deviceCode: any;
  _timeout = 30000;
  _pidVersion = "2.0";
  format = 0;
  _fType = 2; // Prod & PreProd
  _fCoutn = 1;
  _iCount = "";          //L1Device
  _iType = "";           //L1Device
  _environment = "P";    //PROD, L1Device
  // _environment = "PP";      //UAT, L1Device
  _demotag = "";
  _bluetoothConnection = "N";
  _btName = "";
  _dmac = "";
  _wadh = "E0jzJ/P8UopUHAieZn8CKqS4WPMi5ZSYXgfnlfkWjrc=";
  _otp = "";
  _pidOptionsXML: any;
  loading: any;
  jsonData: any;
  curDateTime = moment().format();
  weatherData: any;
  error: string;
  bioDevices = [
    {
      code: '1',
      name: 'Evolute L0 RD'
    },
    {
      code: '2',
      name: 'Evolute L1 Idemia RD'
    },
    {
      code: '3',
      name: 'Mantra MFS110 RD'
    },
    {
      code: '4',
      name: 'ACPL FM220 RD'
    }];

  constructor(public globalData: GlobalFunctionsService, public sqlite: SqliteService, 
    public dataProvider: DataPassingService, public alertErrorLabel: AlertErrorLabel) {

  }

  /** 
 * @method selectedDevice
  * @description Function helps to generate fingerPrint PID Data from evolute Idemia L1 Device.
  * @author HariHaraSuddhan S
 */
  selectedDevice(DName) {
    return new Promise((resolve, reject) => {
      switch (DName) {
        case this.bioDevices[0].code:
          this.L1_RD_Service(EsysRDServiceL0).then((data) => {
            resolve(JSON.stringify(data));
          })
          break;
        case this.bioDevices[1].code:
          this.L1_RD_Service(EsysRDService).then((data) => {
            resolve(JSON.stringify(data));
          })
          break;
        case this.bioDevices[2].code:
          this.L1_RD_Service(MRDService).then((data) => {
            resolve(JSON.stringify(data))
          })
          break;
        case this.bioDevices[3].code:
          this.L1_RD_Service(RDService).then((data) => {
            resolve(JSON.stringify(data));
          })
          break;
      }
    }).catch(err => {
      this.sqlite.addAuditTrail(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), "selectedDevice", "selectedDevice", JSON.stringify(err));
    })
  }

  /** 
 * @method L1_RD_Service
  * @description Function helps to generate fingerPrint PID Data from RD Service L1 Device.
  * @author HariHaraSuddhan S
 */
  L1_RD_Service(deviceName: any) {
    return new Promise((resolve, reject) => {
      this.getGetPidOptionsXML(deviceName).then(data => {
        this._pidOptionsXML = data;
        console.log("_pidOptionsXML", this._pidOptionsXML);
        deviceName.vCapture(function (data) {
          if ((<any>data)[0].res_code == 0) {
            var x2js = new X2JS();
            console.log("XML Pid Data", data[0].res_info);
            var jsonData = x2js.xml2js(data[0].res_info);
            console.log("JSON Pid Data", JSON.stringify(jsonData));
            resolve(jsonData);
          } else {
            this.globalData.presentAlert({title:this.alertErrorLabel.AlertLabels.alert, message:JSON.stringify(data)});
          }
        }, (err) => {
          console.log("Error");
          this.globalData.presentAlert({title:this.alertErrorLabel.AlertLabels.alert, message:JSON.stringify(err)});
        }, this._pidOptionsXML);
      })
    }).catch((err) => {
      this.sqlite.addAuditTrail(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), "L1_RD_Service", "L1_RD_Service", JSON.stringify(err));
    })
  }

  /** 
* @method _getGetPidOptionsXML
* @description Function helps to generate PID Option XML Data request for fingerPrint Scaning Device to get PID data from the device.
* @author HariHaraSuddhan S
*/
  private getGetPidOptionsXML(deviceName: any) {
    let _self = this;
    return new Promise((resolve, reject) => {
      deviceName.vGetPidOptionXML(function (pid) {
        capturexml = pid[0].res_info;
        resolve(capturexml);
      }, function (err) {
        console.log("Error");
        _self.globalData.presentAlert({title:this.alertErrorLabel.AlertLabels.alert, message:JSON.stringify(err)});
        reject(null);
      }, this._timeout, this._pidVersion, this.format, this._fType, this._fCoutn, this._environment,
        this._demotag, this._bluetoothConnection, this._btName, this._dmac, this._wadh, this._otp,
        this._iCount, this._iType);
    }).catch((err) => {
      this.sqlite.addAuditTrail(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), "getGetPidOptionsXML", "getGetPidOptionsXML", JSON.stringify(err));
    })
  }

}
