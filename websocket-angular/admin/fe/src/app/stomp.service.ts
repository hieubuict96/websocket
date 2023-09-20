import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private stompClientAdmin: any;
  private stompClientSeller: any;

  constructor(private http: HttpClient) {}

  connect() {}

  connectSocketAdmin() {
    const ws = new SockJS('http://localhost:8080');
    this.stompClientAdmin = Stomp.over(ws);

    this.stompClientAdmin.connect({}, () => {
      this.stompClientAdmin.subscribe('/user/' + , (msg: any) => {
        console.log(msg);
      });
    }, (err: any) => {

    });
  }

  connectSocketSeller() {
    const ws = new SockJS('http://localhost:8081');
    this.stompClientSeller = Stomp.over(ws);

    this.stompClientSeller.connect({}, () => {
      this.stompClientSeller.subscribe('', (msg: any) => {
        console.log(msg);
      });
    }, (err: any) => {

    });
  }

  send<T>(
    destination: string,
    body: any,
    socketAdmin: boolean,
    headers?: any
  ): void {
    const message = JSON.stringify(body);
    headers = headers || {};
    if (socketAdmin) {
      this.stompClientAdmin.send(destination, headers, message);
    } else {
      this.stompClientSeller.send(destination, headers, message);
    }
  }
}
