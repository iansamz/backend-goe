import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

import { ShowNotificationsService } from '../../shared/show-notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  state: string = '';
  error: any;
  email : string;
  password : string;

  constructor(public as: AuthService,  private router: Router, public showN : ShowNotificationsService) { 
    this.as.authState();
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.as.af.auth.signInWithEmailAndPassword(formData.value.email,formData.value.password)
      .then(
        (success) => {
        this.showN.showNotification('Success. Logged in','success')
        this.router.navigate(['../dash/dashboard']);

      }).catch(
        (err) => {
          this.showN.showNotification(err,'danger')
      });
    }
  }
  

}
