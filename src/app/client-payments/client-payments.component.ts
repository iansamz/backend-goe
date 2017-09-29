import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShowNotificationsService } from '../shared/show-notifications.service';
import { ClientService } from '../dash/client.service';

@Component({
  selector: 'app-client-payments',
  templateUrl: './client-payments.component.html',
  styleUrls: ['./client-payments.component.css']
})
export class ClientPaymentsComponent implements OnInit {
  
  email : string;
  name : string;
  amount : number;
  package : number = 1;
  key : string;
  clientObj ;
  constructor( private router: Router,public ar : ActivatedRoute, public showN : ShowNotificationsService,public cs : ClientService ) { }

  ngOnInit() {
    this.key = this.ar.snapshot.params['key'];

    this.cs.getClient(this.key);
    this.cs.getPayments(this.key);
    // this.cs.clientsObjDb.take(1).subscribe(client=>{
    //   this.email = client.email;
    //   this.name = client.name;
    //   console.log(client.name, client.email);
    // });
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.cs.addPayment(formData.value.amount,formData.value.package,this.key);
      

    }
  }

  deletePayment(key){
    this.cs.deletePayment(this.key,key);
  }

}
