import { Component, OnInit } from '@angular/core';
import { StompService } from './stomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  msg = '';
  text = '';

  constructor(private stompService: StompService) {

  }

  ngOnInit(): void {
      
  }

  sendMsg() {

  }
}
