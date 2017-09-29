import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowNotificationsService } from '../shared/show-notifications.service';
import { ClientService } from '../dash/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  
  email : string;
  name : string;
  key : string;
  clientObj ;
  constructor( private router: Router,public ar : ActivatedRoute, public showN : ShowNotificationsService,public cs : ClientService ) { }

  ngOnInit() {
    this.key = this.ar.snapshot.params['key'];
    this.cs.getClient(this.key);
    this.cs.clientsObjDb.take(1).subscribe(client=>{
      this.email = client.email;
      this.name = client.name;
    });
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.cs.editClient(this.key,formData.value.name,(formData.value.email).toLowerCase());
    }
  }


}
