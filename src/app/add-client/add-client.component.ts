import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowNotificationsService } from '../shared/show-notifications.service';
import { ClientService } from '../dash/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  
  email : string;
  name : string;

  constructor( private router: Router, public showN : ShowNotificationsService,public cs : ClientService ) { }

  ngOnInit() {
  }
  onSubmit(formData) {
    if(formData.valid) {
      this.cs.addClient(formData.value.name,(formData.value.email).toLowerCase());
    }
  }


}
