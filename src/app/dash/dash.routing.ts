import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashComponent } from './dash.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { UserComponent }   from '../user/user.component';
import { ClientsComponent }   from '../clients/clients.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { AccomodationComponent }   from '../accomodation/accomodation.component';
import { MufasaComponent }   from '../mufasa/mufasa.component';
import { VolunteerComponent }   from '../volunteer/volunteer.component';
import { GeneralComponent }   from '../general/general.component';
import { EnquiryComponent } from '../enquiry/enquiry.component';
import { TableComponent }   from '../table/table.component';
import { EditClientComponent  } from '../edit-client/edit-client.component';
import { ClientPaymentsComponent } from '../client-payments/client-payments.component';
import { PackagesComponent } from './packages/packages.component';
import { IconsComponent } from '../icons/icons.component';
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: '',
                component: DashComponent,
                children: [
                    {
                        path: 'dashboard',
                        component: DashboardComponent
                    },
                    {
                        path: 'user',
                        component: UserComponent
                    },
                    {
                        path: 'clients',
                        component: ClientsComponent
                    },
                    {
                        path: 'add-client',
                        component: AddClientComponent
                    },
                    {
                        path: 'accomodation',
                        component: AccomodationComponent
                    },
                    {
                        path: 'mufasa',
                        component: MufasaComponent
                    },
                    {
                        path: 'volunteer',
                        component: VolunteerComponent
                    },
                    {
                        path: 'general',
                        component: GeneralComponent
                    },
                    {
                        path: 'enquiry/:key',
                        component: EnquiryComponent
                    },
                    {
                        path: 'edit-client/:key',
                        component: EditClientComponent
                    },
                    {
                        path: 'client-payments/:key',
                        component: ClientPaymentsComponent
                    },
                    {
                        path: 'packages',
                        component : PackagesComponent
                    },
                    {
                        path: 'icons',
                        component : IconsComponent
                    }
                ]
            }
        ])
    ],   
    exports: [
        RouterModule
    ]
})

export class DashRoutingModule {
}