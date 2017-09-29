import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent} from './login/login.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {
                path: '',
                component: AuthComponent,
                children: [
                    {
                        path: 'login',
                        component: LoginComponent
                    }
                ]
            }
        ])
    ],   
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule {
}