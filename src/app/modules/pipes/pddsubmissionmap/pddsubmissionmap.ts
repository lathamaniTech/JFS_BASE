import { Pipe, PipeTransform } from '@angular/core';
// import { SqliteProvider } from '../../providers/sqlite/sqlite';

/**
 * Generated class for the PddsubmissionmapPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pddsubmissionmap',
})
export class PddsubmissionmapPipe implements PipeTransform {
  
  Document_Type: any[];
  
  // constructor(public sqlite: SqliteProvider) {
  constructor() {

    this.getDocumentsVehicle()
  }

  getDocumentsVehicle() {
    // this.sqlite.getDocumentsVehicle('DocumentsVehicle').then(data => {
    //   this.Document_Type = data;
    // })
  }

  transform(value: string) {
    let docvalue = this.Document_Type.find((f) => {
      return f.docId === value;
    })
      return docvalue.docDescription;
  }
}
