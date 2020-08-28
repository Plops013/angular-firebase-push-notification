import { PushSwService } from './../../services/push-sw.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  notifications: any[] = [];

  constructor(private push: PushSwService, private cdRef: ChangeDetectorRef) { }

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

}
