import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the OtherdocmapPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'otherdocmap',
})
export class OtherdocmapPipe implements PipeTransform {
  other_docs=[
    {
      "DocumentCode": "0",
      "DocumentName": "Other"
    },
    {
      "DocumentCode": "1",
      "DocumentName": "Field-Visit"
    }
  ]
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    let docvalue = this.other_docs.find((f) => {
      return f.DocumentCode === value;
    })
      return docvalue.DocumentName;
  }
}
