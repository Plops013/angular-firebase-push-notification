import { PushSwService } from './../../services/push-sw.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { skip } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notifications: any[] = [];
  username = '';
  isRegistered = false;
  loadingPush = false;

  constructor(private push: PushSwService, private cdRef: ChangeDetectorRef) { }
  nameForm = new FormGroup({
    name: new FormControl(null, Validators.required)
  });

  pushForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    message: new FormControl(null, Validators.required),
    nickname: new FormControl(null, Validators.required),
    link: new FormControl(null)
  });

  ngOnInit(): void {
    this.push.listenForMessages().pipe(skip(1)).subscribe(
      (data) => {
        this.notifications.push(data);
        console.log(this.notifications);
        this.cdRef.detectChanges();
      },
      err => console.log(err),
    );
  }

  public deleteNotification(index: number) {
    this.notifications.splice(index, 1);
    this.cdRef.detectChanges();
  }

  public onSubmit() {
    this.push.requestToken(this.nameForm.get('name').value);
    this.isRegistered = true;
    this.username = this.nameForm.get('name').value;
  }

  public sendPush(){
    this.loadingPush = true;
    const message = {
      title: this.pushForm.get('title').value,
      content: this.pushForm.get('message').value,
      nickname: this.pushForm.get('nickname').value,
      link: this.pushForm.get('link').value
    };
    this.push.sendMessage(message).subscribe(data => {
      this.loadingPush = false;
    },
    err => {
      this.loadingPush = false;
    },
    () => {
      this.loadingPush = false;
    });
  }

}
