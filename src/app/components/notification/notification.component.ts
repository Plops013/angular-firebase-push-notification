import { by } from 'protractor';
import { Component, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnChanges {

  @Input() notifications: any[] = [];
  @Output() delete = new EventEmitter<number>();
  didVote = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  public deleteNotification(index: number) {
    this.delete.emit(index);
  }

}
