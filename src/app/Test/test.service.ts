import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


import { County, GetCountiesResponse } from '../../models/county.interface';
import { GetVideosResponse } from '../../models/videos.interface';


@Injectable({
    providedIn: 'root'
  })

export class TestService {
  constructor() {  }

  private httpClient = inject(HttpClient);

  private _urlBase: string = 'https://dev.rospaiart.ie/API/';
  private _urlModule: string = 'testAPIModule/test/';

  // Counties
  getLocations(): Observable<County[]> {
    console.log('Getting locations from API');
    return this.httpClient.get<County[]>(this._urlBase + this._urlModule + 'loc2');
  }

  sayHello(): Observable<string> {
    console.log('Saying hello from API');

    return this.httpClient.get<string>(this._urlBase + this._urlModule + 'sayhello');
  }

  getVideos(): Observable<GetVideosResponse> {
    return this.httpClient.get<GetVideosResponse>('https://dnndave.com/api/2sxc/app/BasicContent/api/Video/Get');
  }

  public handleRestError(err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      // A client-side or network error occurred.
      console.log('An error occurred:', err.error.message);
      console.log(err.error.stack);
    } else {
      // Backend returns unsuccessful response codes such as 404, 500 etc.
      console.log('Backend returned status code: ', err.status);
      console.log('Response body:', err.error);
    }
}

}

