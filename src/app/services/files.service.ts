import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { tap, map, pipe} from 'rxjs'
import { saveAs } from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class FilesService {
  constructor(
    private _http: HttpClient
  ) { }

  public getFile(name: string, url: string, type: string) {
    return this._http.get(url, {
      responseType: 'blob'
    })
    .pipe(
      tap((content: any) => {
        const blob = new Blob([content], { type });
        saveAs(blob, name);
      }),
      map(() => true)
    )
  }
}
