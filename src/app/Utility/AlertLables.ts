import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlertLables {
  AlertsText = {
    alert: 'Alert',
    success: 'Success',
    failed: 'Failed',
    cancel: 'Cancel',
    ok: 'Ok',
    Enable_Internet: 'Enable Internet connection!.',
    Certificates_Pinning_Error: 'Certificates pinning error!',
    decryptError: 'No Proper Response from Server!!',
    locationOn: 'Please Turn On Location'
  };

  LoadingText = {
    fetch: 'Fetching location...',
  };

  constructor() {}
}
