import { Component, HostListener } from '@angular/core';
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
  inputMessage;
  imgUrl: string|ArrayBuffer;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event:  
      KeyboardEvent) {
    //console.log('tested');
    this.inputMessage = '';
  }
  constructor() {
    this.selectFriend = 1;
    this.checkLocalStore();
  }

  checkLocalStore() {
    const msg = localStorage.getItem(this.selectFriend.toString())
    if(msg) {
      this.messageObj = JSON.parse(msg);
    }
    else
      this.messageObj = chat[1].messages;
  }

  sendMessage(sendForm: NgForm) {
    const date = new Date();
    this.messageObj.push({ user: 'You', message: sendForm.value.message,
      time: date
    });
    localStorage.setItem(this.selectFriend.toString(), JSON.stringify(this.messageObj));
    sendForm.controls.message.reset();
  }

  onChange(value: number) {
    this.messageObj = chat[value].messages;
  }

  uploadFile($event) {
    const reader = new FileReader();
		reader.readAsDataURL($event.target.files[0]);

    reader.onload = (_event) => {
			this.imgUrl = reader.result; 
		}
  }
}
