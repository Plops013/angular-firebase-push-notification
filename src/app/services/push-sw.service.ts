import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushSwService {

  constructor(private fireMessaging: AngularFireMessaging, private http: HttpClient) { }

  public requestPermission() {
    let currentToken = '';
    this.fireMessaging.requestPermission.subscribe(
      (token) => {
        this.fireMessaging.getToken.subscribe(text => {
          currentToken = text;
          console.log('Permission granted! Save to the server! ', currentToken);
          this.http.post('https://firebase-notification.herokuapp.com/register', currentToken).subscribe();
        });

      },
      (error) => { console.error(error); },
    );
  }

  public getMessages() {
    return this.fireMessaging.messages;
  }


}
