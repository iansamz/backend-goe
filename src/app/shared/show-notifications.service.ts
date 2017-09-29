import { Injectable } from '@angular/core';

declare var $ : any;

@Injectable()
export class ShowNotificationsService {

  constructor() { }

  showNotification(message, type){
        // var type = ['','info','success','warning','danger'];

        // var color = Math.floor((Math.random() * 4) + 1);

    	$.notify({
        	icon: "ti-announcement",
        	message: message
        },{
            type: type,
            timer: 4000,
            placement: {
                from: 'bottom',
                align: 'right'
            }
        });
    } 
}
