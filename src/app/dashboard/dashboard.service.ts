import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ShowNotificationsService } from '../shared/show-notifications.service';
import { ClientService } from '../dash/client.service';

export class Payment{
  amount: number;
  $key : string;
  package : string;
}

@Injectable()
export class DashboardService {

  constructor(public db : AngularFireDatabase, public showN : ShowNotificationsService, public router : Router, public cs : ClientService) { }

  clients : FirebaseListObservable<any[]>;
  lclients : number;
  enquiries : FirebaseListObservable<any[]>;
  lenquiries : number;
  totalRevenue : number = 0;
  totalPackages : number;
  payments : FirebaseListObservable<any[]>;
  paymentClient : FirebaseListObservable<any[]>;
  paymentArray = [];
  payment : Payment;
  getClients(){
    this.clients = this.db.list('/clients');
    this.clients.subscribe(clients=>{
      this.lclients = clients.length;
    })
  }

  getRevenue(){
    this.payments = this.db.list('/payments');

    this.payments.subscribe(data=>{
      //loop through client node of payments

      for (var i = 0; i < data.length; i++) {

        this.paymentClient = this.db.list('/payments/'+data[i].$key);
        this.paymentClient.subscribe(payment=>{

          for(var x = 0; x < payment.length; x++){
            let a = this.totalRevenue;
            this.totalRevenue = a + payment[0].amount;
          }
          
        });
      }
    });
  }

  getPackages(){
    this.totalPackages = this.cs.packagesA.length;
  }

  getEnquiries(){
    this.enquiries = this.db.list('/enquiries');
    this.enquiries.subscribe(enquiries=>{
      this.lenquiries = enquiries.length; 
    })
  }

  appendObjTo(thatArray, objToAppend) {
    return Object.freeze(thatArray.concat(objToAppend));
  }
}
