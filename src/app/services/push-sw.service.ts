import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMapTo } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PushSwService {

  currentMessage = new BehaviorSubject(null);

  constructor(private fireMessaging: AngularFireMessaging, private http: HttpClient, private fireDataBase: AngularFireDatabase) {
  }

  public sendMessage(message: any): Observable<any>{
    return this.http.post<any>('https://firebase-notification.herokuapp.com/message', message);
  }

  public requestToken(nickname: string) {
    this.fireMessaging.requestToken.pipe(
      map(token => this.subscribeToJava(token, nickname))
    ).subscribe();
    this.fireMessaging.onTokenRefresh(() => {
      this.fireMessaging.getToken.subscribe((refreshedToken) => {
        console.log('Token refreshed.');
        this.updateToken(refreshedToken, nickname);
      });
    });
  }

  private updateToken(token: string, nickname: string){
    this.http.put('https://firebase-notification.herokuapp.com/token', {
      nickname,
      clientToken: token
    }).subscribe();
    console.log('java refresh token: ', token);
  }

  private subscribeToJava(token: string, nickname: string) {
    this.http.post('https://firebase-notification.herokuapp.com/token', {
      nickname,
      clientToken: token
    }).subscribe();
    console.log('java token: ', token);
  }

  listenForMessages(): Observable<{}> {
    const messages = new BehaviorSubject(null);
    const broadcast = new BroadcastChannel('messaging-sw');
    broadcast.onmessage = (event) => {
      messages.next({
        ...event.data.notification,
        link: event.data.fcmOptions.link
      });
    };

    this.fireMessaging.messages.subscribe(
      (data) => {
        messages.next({
          ...(data as any).notification,
          link: (data as any).fcmOptions.link
        });
      },
      err => console.log(err),
    );
    return messages;
  }
}
