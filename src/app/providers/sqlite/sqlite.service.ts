import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { BehaviorSubject } from 'rxjs'
import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { GlobalFunctionsService } from '../globalfunctions/global-functions.service';
import { ErrorLogService } from '../errorLog/error-log.service';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
    database: SQLiteObject;
    databaseReady: BehaviorSubject<boolean>;
    name: string;
    db_name: string = 'jfs_bank.db';
    dateTime = new Date();
  
    constructor(public httpAngular: HttpClient, public platform: Platform, public global: GlobalFunctionsService,
      public sqlite: SQLite, public sqlitePorter: SQLitePorter, public device: Device, public errorHandling: ErrorLogService) {
      this.databaseReady = new BehaviorSubject(false);
      this.platform.ready().then(() => {
        this.sqlite.create({
          name: this.db_name,
          location: 'default'
        }).then((db: SQLiteObject) => {
          this.database = db;
          this.global.setGlobalSQLiteObj(this.database);
          this.loadInit();
          this.databaseReady.next(true);
        }).catch(error => {
          console.log(error);
        });
      })
    }
  
    getDatabaseState() {
      return this.databaseReady.asObservable();
    }
  
    loadInit() {
      this.httpAngular.get('assets/sql/query.sql',{ responseType: 'text' }).subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql).then(data => {
        }).catch(e => console.log(e));
      })
    } 

    addAuditTrail(Timestamp, service, action, value) {
      let data = [localStorage.getItem('username'), this.device.uuid, Timestamp, service, action, value];
      return this.database.executeSql("INSERT INTO AUDIT_LOG(username,deviceID,Timestamp,service,action,value) VALUES (?,?,?,?,?,?)", data).then((data) => {
        return data;
      }, error => {
        this.insertErrorLog(error.stack ? error.stack : error, "addAuditTrail");
        this.errorHandling.errorLog(error, "addAuditTrail")
        return error;
      })
    }

    insertErrorLog(value, pageName) {
      let data = [localStorage.getItem('username'), this.global.getDeviceId(), moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), value, pageName];
      return this.database.executeSql("INSERT INTO ERROR_LOG(username,deviceID,Timestamp,errorDesc,pageName) VALUES (?,?,?,?,?)", data).then((data) => {
        return data;
      }, error => {
        this.insertErrorLog(error.stack ? error.stack : error, "insertErrorLog");
        this.errorHandling.errorLog(error, "insertErrorLog")
        return error;
      })
    }

  }