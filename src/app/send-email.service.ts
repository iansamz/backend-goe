import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { ShowNotificationsService } from './shared/show-notifications.service';

@Injectable()
export class SendEmailService {

  constructor(private http: Http, public showN : ShowNotificationsService) { }
  // createAuthorizationHeader(headers:Headers) {
  //   headers.append('Authorization', 'Basic ' +
  //     btoa('a20e6aca-ee83-44bc-8033-b41f3078c2b6:c199f9c8-0548-4be79655-7ef7d7bf9d20')); 
  // }
  sendEmail(toEmail,fromEmail,subject,content) {
    console.log(toEmail,fromEmail,subject,content)
    let url = `https://us-central1-gardenretreatcentre.cloudfunctions.net/httpEmail`
    let params: URLSearchParams = new URLSearchParams();
    // let headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' });
    var headers = new Headers();
    // this.createAuthorizationHeader(headers);
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');

    params.set('to', toEmail);
    params.set('from', fromEmail);
    params.set('subject', subject);
    params.set('content', content);
    // return this.http.post(url,params,headers)
    this.http.post(url, params,{
      headers:headers
    })
      .toPromise()
      .then( res => {
        this.showN.showNotification('Success','success');
      })
      .catch(err => {
        this.showN.showNotification(err,'danger');
      })
  }
  
}
