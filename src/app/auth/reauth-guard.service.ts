import { Injectable } from '@angular/core';
import { Router, CanLoad , CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ReAuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(public router : Router,public as: AuthService){

  }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{ 
    return this.checkLogin();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    return this.canActivate(route, state); 
  }

  canLoad(){
    return this.checkLogin();
  }

  checkLogin() : Observable<boolean> | Promise<boolean> | boolean{
    return this.as.af.authState
            .take(1)
            .map(authState => !(!!authState))
            .do(authenticated => {
              if (!authenticated) {
                  this.router.navigate(['/user/dashboard']);
              }
            });
  }
}
