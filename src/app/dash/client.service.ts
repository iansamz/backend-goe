import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ShowNotificationsService } from '../shared/show-notifications.service';

@Injectable()
export class ClientService {

  clientsDb : FirebaseListObservable<any[]>;
  clientsObjDb : FirebaseObjectObservable<any[]>;
  clientCheck : FirebaseListObservable<any[]>;
  paymentsDb : FirebaseListObservable<any[]>;
  client = {
    name : "",
    email : ""
  }; 
  payments 


  packagesA = [
    {value: 1, name:'8 Days,7 Nights Budget Safari Around Kenya', type:'safari'},
    {value: 2, name:'Equator Great Falls Tour', type:'safari'},
    {value: 3, name:'Full Day Mount Longonot Climbing and Hiking Adventure', type:'safari'},
    {value: 4, name:'Maasai Mara, Lake Naivasha/Bogoria/Nakuru and Amboseli Visits', type:'safari'},
    {value: 5, name:"Hell's gate Bike Riding and Walking Tour", type:'safari'},
    {value: 6, name:'Lake Nakuru National Park Day Trip', type:'safari'},
    {value: 7, name:'Mombasa Beaches Coastal Beaches Tour', type:'safari'},
    {value: 8, name:'Maasai Mara Camping Safari tour ', type:'safari'},
    {value: 9, name:'Nairobi Full Day Tour', type:'safari'},
    {value: 10, name:'Nairobi Half Day Tour ', type:'safari'},
    {value: 11, name:'Nairobi National Park One Day Tour', type:'safari'},
    {value: 12, name:'Tea Farm Day Tour', type:'safari'},
    {value: 13 , name:'Train Tour to Mombasa', type:'safari'},
    {value: 14, name:'Zip Lining, Bungee Jumping And Water Rafting', type:'safari'},
    {value: 15, name:'Angaza (Light) Volunteer Program', type:'volunteer'},
    {value: 16, name:'Animal Care Program', type:'volunteer'},
    {value: 17, name:'Childcare Volunteeer Program', type:'volunteer'},
    {value: 18, name:'Crafts Teaching Volunteer Programs', type:'volunteer'},
    {value: 19, name:'Music Teaching  Volunteer Program', type:'volunteer'},
    {value: 20, name:'Adopt a Granny Volunteer Program', type:'volunteer'},
    {value: 21, name:'Sports Volunteer Program', type:'volunteer'},
    {value: 22, name:'Teaching Volunteer Program', type:'volunteer'},
    {value: 23, name:'Youth Mentorship Volunteer Program', type:'volunteer'},
    
  ];

  constructor(public db : AngularFireDatabase, public showN : ShowNotificationsService, public router : Router) { }


  addClient(name, email){
    
    this.clientCheck = this.db.list('/clients',{
      query:{
        orderByChild:'email',
        equalTo: email
      }
    });

    this.clientCheck.take(1).subscribe(clients=>{
      if(clients.length == 0){
        this.clientsDb = this.db.list('/clients');
        this.clientsDb.push({
          name:name,
          email:email,
          time: Date.now()
        })
        .then( res => {
          this.showN.showNotification('Success','success')
          this.router.navigateByUrl('/user/clients')
        })
        .catch(err => {
          this.showN.showNotification(err,'danger')
        })
      }else{
        this.showN.showNotification('There exists a client with same email. Please check and retry','danger');
      }
    });
  }

  editClient(key,name, email){
    this.clientCheck = this.db.list('/clients',{
      query:{
        orderByChild:'email',
        equalTo: email
      }
    });
    this.clientCheck.take(1).subscribe(clients=>{
      
      if(clients.length == 0){
        this.clientsDb = this.db.list('/clients');
        this.clientsDb.update(key,{
          name:name,
          email:email
        })
        .then( res => {
          this.showN.showNotification('Success','success')
          this.router.navigateByUrl('/user/clients')
        })
        .catch(err => {
          this.showN.showNotification(err,'danger')
        })
        
      }else if(clients[0].email==this.client.email){
        this.clientsDb = this.db.list('/clients');
          this.clientsDb.update(key,{
            name:name,
            email:email
          })
          .then( res => {
            this.showN.showNotification('Success','success')
            this.router.navigateByUrl('/user/clients')
          })
          .catch(err => {
            this.showN.showNotification(err,'danger')
          })
        
      }else{
        this.showN.showNotification('There exists a client with same email.Please check and retry','danger');
      }
    });
  }  
  getClient(key){
    this.clientsObjDb = this.db.object('/clients/'+ key);
    this.clientsObjDb.take(1).subscribe(client=>{
      this.client = client;
    });
  }

  deleteClient(key){
    this.clientsDb = this.db.list('/clients');
    this.clientsDb.remove(key)
    .then( res => {
      this.showN.showNotification('Successfully Client Deleted','success')
    })
    .catch(err => {
      this.showN.showNotification(err,'danger')
    })
    this.paymentsDb = this.db.list('/payments');
    this.paymentsDb.remove(key)
    .then( res => {
      this.showN.showNotification('Successfully Payments Deleted','success')
    })
    .catch(err => {
      this.showN.showNotification(err,'danger')
    })
  }

  getPayments(clientKey){
    this.paymentsDb = this.db.list('/payments/'+ clientKey);
    this.paymentsDb.subscribe(payments=>{
      this.payments = payments
    })
  }

  addPayment(amount,pkg,clientKey){
    // console.log(amount,pkg);
    let paymentDb = this.db.list('/payments/'+ clientKey);
    paymentDb.push({
      amount: amount,
      package: pkg
    })
    .then( res => {
      this.showN.showNotification('Successfully Added','success')
    })
    .catch(err => {
      this.showN.showNotification(err,'danger')
    })
  }

  deletePayment(clientKey,paymentKey){
    let paymentDb = this.db.list('/payments/'+ clientKey);
    paymentDb.remove(paymentKey)
    .then( res => {
      this.showN.showNotification('Successfully Deleted','success')
    })
    .catch(err => {
      this.showN.showNotification(err,'danger')
    })
  }
}
