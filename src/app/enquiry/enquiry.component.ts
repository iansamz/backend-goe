import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable } from 'angularfire2/database';

import { SendEmailService } from './../send-email.service';
import { ShowNotificationsService } from '../shared/show-notifications.service';
import { ClientService } from '../dash/client.service';

@Component({
  selector: 'app-enquiry',
  moduleId: module.id,
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  key : string;
  enquiryDb : FirebaseObjectObservable<any[]>;
  enquiry = {
    $key:"",
    name:"",
    email:"",
    package:"",
    info:""
  };
  constructor(public router: Router,public ar:ActivatedRoute, public db : AngularFireDatabase, public showN : ShowNotificationsService, public sendEmailService:SendEmailService, public cs : ClientService) {

    this.key = (this.ar.snapshot.params['key']);
    // console.log(Date.now())
    this.enquiryDb = this.db.object('/enquiries/'+ this.key);
    this.enquiryDb.take(1).subscribe(enquiry=>{
      this.enquiry = enquiry;
    });
   }

  ngOnInit() {
    
  }

  
  addClient(toEmail,name,email,cpackage) {
      let subject = "Garden Retreat Centre";
      let content = "Hi " + name + " this is Joe. Your Enquiry has been noted. You will be contacted shortly. Thank you";
      this.sendEmailService.sendEmail(toEmail,'joewakaba@gardenretreatcentre.com',subject,content);

      this.cs.addClient(name,email);
      
  }
  
}

