import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component'

import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { ReAuthGuardService } from './reauth-guard.service';
import { ShowNotificationsService } from '../shared/show-notifications.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent,
    LoginComponent
  ]
})
export class AuthModule { 
   static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuardService,
        ReAuthGuardService,
        ShowNotificationsService
      ]
    };
  }
}
