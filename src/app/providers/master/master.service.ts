import { BehaviorSubject } from 'rxjs';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { LoadingController } from '@ionic/angular';
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
export class MasterService {

  constructor(
   ) {
  }

}
