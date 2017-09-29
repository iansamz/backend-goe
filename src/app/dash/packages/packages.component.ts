import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {

  constructor(public cs : ClientService) { }

  ngOnInit() {
  }

}
