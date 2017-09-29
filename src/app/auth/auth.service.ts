import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
// import { User } from '../classes/user';
import * as firebase from 'firebase/app';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
// import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';


import { ShowNotificationsService } from '../shared/show-notifications.service';

@Injectable()
export class AuthService {

  ifUser : boolean = false;
  
  constructor(public af : AngularFireAuth, private router : Router, public db :AngularFireDatabase,public showN : ShowNotificationsService ) { 
    
  }

  authState(){
    this.af.authState.subscribe(auth => { 
      if(auth) {
        this.ifUser = true;
        this.router.navigateByUrl('/user/dashboard');
      }
      else{
        this.ifUser = false;
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  logout() {

    this.ifUser = false;
    this.af.auth.signOut();
    this.router.navigateByUrl('/auth/login');
    
  }


  loginGoogle(error) {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(
        (success) => {
          this.ifUser = true;
          this.router.navigate(['/dashboard']);
          this.showN.showNotification(success,'success');
        }).catch(
          (err) => {
          error = err;
          this.showN.showNotification(err,'danger');
        })
  }
     

}
