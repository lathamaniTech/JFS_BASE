import { Pipe, PipeTransform } from '@angular/core';
// import { SqliteProvider } from "../../providers/sqlite/sqlite";

/**
 * Generated class for the BranchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'branch',
})
export class BranchPipe implements PipeTransform {

  org_master: any;

  // constructor(public sqliteProvider: SqliteProvider) {

  //   this.sqliteProvider.getOrganisation().then(data => {
  //     this.org_master = data;
  //   })
  // }
  
  transform(value: string) {
    let selectedorg = this.org_master.find((f) => {
      return f.orgscode === value;
    })
    return selectedorg.orgname;
  }
}
