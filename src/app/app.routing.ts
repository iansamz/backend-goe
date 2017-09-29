import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { AuthGuardService } from './auth/auth-guard.service';
import { ReAuthGuardService } from './auth/reauth-guard.service';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'auth',
                pathMatch: 'full',
            },
            {
                path: 'auth',
                loadChildren: './auth/auth.module#AuthModule',
                canActivate:[ReAuthGuardService]
            },
            {
                path: 'user',
                loadChildren: './dash/dash.module#DashModule',
                canActivate:[AuthGuardService]
            }
            
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}