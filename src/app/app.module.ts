import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Device } from '@awesome-cordova-plugins/device/ngx'
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Device,
    HTTP,
    Keyboard,
    Network,
    SQLite,
    SQLitePorter,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
