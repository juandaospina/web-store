import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { tap, map } from 'rxjs'
import { saveAs } from 'file-saver'
import { environment } from 'src/environments/environment'
import { File } from '../types/file'

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

  public uploadFile(file: Blob) {
    // Native way for sent file
    const formData = new FormData();
    formData.append('file', file);
    return this._http.post<File>(`${environment.baseUrl}/files/upload`, formData, {
      // headers are option if the backend requires them
      headers: {
        'Content-Type': 'multiplart/form-data'
      }
    })
  }
}
