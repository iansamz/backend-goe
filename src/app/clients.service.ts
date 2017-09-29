import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@Injectable()
export class ClientsService {

  constructor(private db: AngularFireDatabase) { }
  
  getClients(batch, lastKey?) {
    let query =  {
            orderByKey: true,
            limitToFirst: batch,
            // orderByChild: 'type'
          }
    if (lastKey) query['startAt'] = lastKey
    return this.db.list('/clients', {
      query
    })
  }

}
