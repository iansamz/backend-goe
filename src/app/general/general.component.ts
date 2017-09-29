import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { EnquiryService } from '../enquiry.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/take';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/operator/do';
import * as _ from 'lodash'



@Component({
    selector: 'general-cmp',
    templateUrl: 'general.component.html',
    styleUrls: ['general.component.css'],
    moduleId: module.id
})

export class GeneralComponent implements OnInit{
    
    enquiries = new BehaviorSubject([]);
    batch = 30         // size of each query
    lastKey = ''      // key to offset next query from
    finished = false  // boolean when end of database is reached

    // general : FirebaseListObservable<any[]>;
    // pages : number; 
    // pagesArray = [];
    // limit : number = 50;
    // enquiries : Object;
    // pageNumber = 1;
    // pageSize = 50;
    

    // constructor(db: AngularFireDatabase, public router : Router) {
    constructor(public router : Router, public enquiryS: EnquiryService){
        // this.general = db.list('/enquiries', {
        //     query: {
        //         orderByChild: 'type',
        //         equalTo: 'general'
        //     }
        // });
        
        // this.general.subscribe(list=>{
        //     console.log(list);
        // });

    }
    ngOnInit(){
        this.getEnquiries();
        // this.general.subscribe(enquiries=>{

            // this.pages = Math.floor((enquiries.length/50));
            
            // if((enquiries.length%50)>0){
            //     this.pages = this.pages+1;
            // }
            

            // for(let i = 0; i < this.pages; i++){
            //     this.pagesArray[i] = {number: i+1};
            // }

            // this.enquiries = this.paginate(enquiries, this.pageSize, this.pageNumber);
        // });
    }
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
        .getEnquiry(this.batch+1,'general', this.lastKey)
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
   
    
    // paginate(array, pageSize, pageNumber){
    //     --pageNumber;
    //     return array.slice((pageNumber*pageSize), (pageNumber + 1)*pageSize);
    // }

    
    // previous(){
    //     if(this.pageNumber > 1){
    //         this.enquiries = this.paginate(this.enquiries, this.pageSize, this.pageNumber--);
    //         // console.log(this.enquiries);
    //     }
        
    // }
    // next(){
    //     this.enquiries = this.paginate(this.enquiries, this.pageSize, this.pageNumber++);
    //     console.log(this.enquiries);
    // }
}


