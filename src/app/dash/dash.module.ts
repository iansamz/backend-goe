import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarModule } from '../sidebar/sidebar.module';
import { FooterModule } from '../shared/footer/footer.module';
import { NavbarModule} from '../shared/navbar/navbar.module';
import { FixedPluginModule} from '../shared/fixedplugin/fixedplugin.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DashRoutingModule } from './dash.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashComponent } from './dash.component';
import { DashboardComponent }   from '../dashboard/dashboard.component';
import { UserComponent }   from '../user/user.component';
import { ClientsComponent }   from '../clients/clients.component';
import { AccomodationComponent }   from '../accomodation/accomodation.component';
import { MufasaComponent }   from '../mufasa/mufasa.component';
import { VolunteerComponent }   from '../volunteer/volunteer.component';
import { GeneralComponent }   from '../general/general.component';
import { TableComponent }   from '../table/table.component';
import { EnquiryComponent } from '../enquiry/enquiry.component';
import { AddClientComponent } from '../add-client/add-client.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { ClientPaymentsComponent } from '../client-payments/client-payments.component';
import { PackagesComponent } from './packages/packages.component';
import { IconsComponent } from '../icons/icons.component';
import { MapsComponent } from '../maps/maps.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { TypographyComponent } from '../typography/typography.component';
import { UpgradeComponent } from '../upgrade/upgrade.component';

import { ShowNotificationsService } from '../shared/show-notifications.service';
import { ClientService } from './client.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { SendEmailService } from '../send-email.service';
import { EnquiryService } from '../enquiry.service';
import { ClientsService } from '../clients.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    InfiniteScrollModule,
    DashRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    DashComponent,
    DashboardComponent,
    UserComponent,
    ClientsComponent,
    AccomodationComponent,
    MufasaComponent,
    VolunteerComponent,
    GeneralComponent,
    TableComponent,
    EnquiryComponent,
    AddClientComponent,
    EditClientComponent,
    ClientPaymentsComponent,
    PackagesComponent,
    IconsComponent,
    MapsComponent,
    TypographyComponent,
    NotificationsComponent,
    UpgradeComponent
  ],
  providers:[
    ClientService,
    ShowNotificationsService,
    DashboardService,
    SendEmailService, 
    EnquiryService,
    ClientsService
  ]
})
export class DashModule { }
