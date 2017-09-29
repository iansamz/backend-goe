import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class EnquiryService {

  constructor(private db: AngularFireDatabase) { }
  
  getEnquiry(batch,eType, lastKey?) {
    let query =  {
            // orderByKey: true,
            limitToFirst: batch,
            orderByChild: 'type',
            equalTo: eType
          }
    if (lastKey) query['startAt'] = lastKey
    return this.db.list('/enquiries', {
      query
    })
  }

}
