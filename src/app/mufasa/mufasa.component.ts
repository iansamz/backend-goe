import { Component, OnInit } from '@angular/core';
import { EnquiryService } from '../enquiry.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/do';
import * as _ from 'lodash'

@Component({
    selector: 'mufasa-cmp',
    templateUrl: 'mufasa.component.html',
    styleUrls:['mufasa.component.css'],
    moduleId: module.id
    
})

export class MufasaComponent implements OnInit{

    enquiries = new BehaviorSubject([]);
    batch = 30         // size of each query
    lastKey = ''      // key to offset next query from
    finished = false  // boolean when end of database is reached

    ngOnInit(){
        this.getEnquiries();
    }

    constructor(public router : Router, public enquiryS: EnquiryService){}
    onScroll () {
        console.log('scrolled!!')
        this.getEnquiries()
    }
    
    goTo(key){
        this.router.navigateByUrl('/user/enquiry/' + key);
    }

    private getEnquiries(key?){
        if (this.finished) return

        this.enquiryS
        .getEnquiry(this.batch+1,'mufasa', this.lastKey)
        .do(enquiries => {
          /// set the lastKey in preparation for next query
          this.lastKey = _.last(enquiries)['$key']
          const newEnquiries = _.slice(enquiries, 0, this.batch)
          /// Get current enquiries in BehaviorSubject
          const currentEnquiries = this.enquiries.getValue()
          /// If data is identical, stop making queries
          if (this.lastKey == _.last(newEnquiries)['$key']) {
            this.finished = true
          }
          /// Concatenate new enquiries to current enquiries
          this.enquiries.next( _.concat(currentEnquiries, newEnquiries) )
        })
        .take(1)
        .subscribe()
    } 
}