import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PushSwService {

  currentMessage = new BehaviorSubject(null);

  constructor(private fireMessaging: AngularFireMessaging, private http: HttpClient, private fireDataBase: AngularFireDatabase) {
    this.fireMessaging.requestToken.pipe(
      map(token => this.subscribeToJava(token))
    ).subscribe();
  }

  private subscribeToJava(token: string) {
    this.http.post('https://firebase-notification.herokuapp.com/register', token);
    console.log('java token: ', token);
  }

  listenForMessages(): Observable<{}> {
    const messages = new BehaviorSubject(null);
    const broadcast = new BroadcastChannel('messaging-sw');
    broadcast.onmessage = (event) => {
      messages.next(event.data.notification);
    };

    this.fireMessaging.messages.subscribe(
      (data) => {
        messages.next((data as any).notification);
      },
      err => console.log(err),
    );
    return messages;
  }
}
