import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getSubscriptionTypes(): Observable<string[]>
  {
    throw of(['Monthly', 'Annual', 'Lifetime']);
  }

  postUserSettingsForm(userSettings: UserSettings) : Observable<any>
  {
    //return of(userSettings);

    //The url used can be created in the PutsReq website.
    return this.http.post('https://putsreq.com/sDnfjc6dhtyv7k7p4coB', userSettings);

    //The following code is run in PutsReq.
    //When it gets the "userSettings" object, it will parse its contents into JSON.
    //It will then assign it a key named "id" and a value of "1234".
    //It then returns this parsedBody in its response.
    /*
    var parsedBody = JSON.parse(request.body)
    parsedBody.id = "1234";

    response.body = parsedBody;
    */

    //response.status will return its value as a status code to the browser
    //response.body will return an object with an errorMessage.

    //response.status = "400";

    //response.body = {errorMessage: "Some error goes here..."};

    
  }
}
