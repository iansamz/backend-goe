import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { ClientService } from '../dash/client.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/do';
import * as _ from 'lodash'


declare var $:any;

@Component({
    selector: 'client-cmp',
    templateUrl: 'clients.component.html',
    styleUrls: ['clients.component.css'],
    moduleId: module.id
})

export class ClientsComponent implements OnInit{
    
    clients = new BehaviorSubject([]);
    batch = 30         // size of each query
    lastKey = ''      // key to offset next query from
    finished = false  // boolean when end of database is reached

    ngOnInit(){
        this.getClients();
    }

    constructor(public router : Router, public cs1: ClientsService, public cs : ClientService){}

    onScroll () {
        this.getClients()
    }
    
    goTo(key){
        this.router.navigateByUrl('/user/client-payments/'+key);
    }

    deleteClient(key){
        this.cs.deleteClient(key);
    }

    editClient(key){
        this.router.navigateByUrl('/user/edit-client/'+key);
    }

    private getClients(key?){
        if (this.finished) return

        this.cs1
        .getClients(this.batch+1, this.lastKey)
        .do(clients => {
          /// set the lastKey in preparation for next query
          this.lastKey = _.last(clients)['$key']
          const newClients = _.slice(clients, 0, this.batch)
          /// Get current enquiries in BehaviorSubject
          const currentClients = this.clients.getValue()
          /// If data is identical, stop making queries
          if (this.lastKey == _.last(newClients)['$key']) {
            this.finished = true
          }
          /// Concatenate new enquiries to current enquiries
          this.clients.next( _.concat(currentClients, newClients) )
        })
        .take(1)
        .subscribe()
    } 
    
}