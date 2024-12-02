import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogService {
  constructor() {
    console.log('Hello ErrorLogProvider Provider');
  }

  refErrorCheck(neededValues: string[], response: object) {
    const arr = neededValues.map((value, index) => {
      if (!response.hasOwnProperty(value)) {
        return value;
      } else {
        return null;
      }
    }).filter(i => {
      if (i) {
        return true;
      } else {
        return false;
      }
    });
    return arr;
  }

  async errorLog(refErr: Error | ReferenceError | TypeError, method?) {
    let checkfile: boolean;
    try {
      // checkfile = await this.file.checkFile(this.file.externalApplicationStorageDirectory + "errors/", "errorlog.txt");
      await Filesystem.readdir({ path: "errors/" + "errorlog.txt", directory: Directory.External });
    } catch (error) {
      if (error.message === 'NOT_FOUND_ERR') {
        let createdFile: any;
        try {
          // createdFile = await this.file.createFile(this.file.externalApplicationStorageDirectory + 'errors/', 'errorLog.txt', false);
          await Filesystem.mkdir({ path: 'errors/', directory: Directory.External, recursive: false });
        } catch (error) {
          console.log(error); // create file function error block.
        }
        createdFile.createWriter(fileWriter => {
          fileWriter.write('*****Start of the file*****');
          fileWriter.onwriteend = (evt) => {
            // this.file.readAsText(this.file.externalApplicationStorageDirectory + 'errors/', 'errorLog.txt').then(val => {
            Filesystem.readFile({ path: 'errors/errorLog.txt', directory: Directory.External }).then(val => {
            }).catch(err => console.log(err));
            this.errorLog(refErr, method);
          };
        },
          err => console.log(err));
      }
    }

    if (checkfile) {
      let textContent: any;
      try {
        // textContent = await this.file.readAsText(this.file.externalApplicationStorageDirectory + 'errors/', 'errorLog.txt');
        // this.file.readAsText(this.file.externalApplicationStorageDirectory + 'errors/', 'errorLog.txt').then(async data=>{
        await Filesystem.readFile({ path: 'errors/errorLog.txt', directory: Directory.External }).then(async data => {
          textContent = data;
          let filewrite;
          try {
            // filewrite = await this.file.writeExistingFile(this.file.externalApplicationStorageDirectory + 'errors/', 'errorLog.txt', `
            filewrite = await Filesystem.writeFile({
              path: 'errors/errorLog.txt', data: `
          ${textContent}
  
          *****------*****
          ${method}
           ${Date()}
           ${refErr.stack ? refErr.stack : JSON.stringify(refErr)}`, directory: Directory.External
            });
          } catch (error) {
            // this.global.dismissLoading();
          }
        })
      } catch (error) {
        console.log(error);
      }

    }
  }


}
