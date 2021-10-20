import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import chat from './chatHistory.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  messageObj = [];
  selectFriend: number;
  friendsList = [
    { code: 1, name: 'Olivia' },
    { code: 2, name: 'Alexa' }
  ];
  constructor() {
    this.selectFriend = 1;
    this.messageObj = chat[1].messages;
  }

  sendMessage(sendForm: NgForm) {
    this.messageObj.push({ user: 'You', message: sendForm.value.message });
    sendForm.controls.message.reset();
  }

  onChange(value: number) {
    this.messageObj = chat[value].messages;
  }
}
