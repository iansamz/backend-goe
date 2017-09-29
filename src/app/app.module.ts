import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
// import { SidebarModule } from './sidebar/sidebar.module';
// import { FooterModule } from './shared/footer/footer.module';
// import { NavbarModule} from './shared/navbar/navbar.module';
// import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';
import { HttpModule } from '@angular/http';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
// import { DashboardComponent }   from './dashboard/dashboard.component';
// import { UserComponent }   from './user/user.component';
// import { ClientsComponent }   from './clients/clients.component';
// import { AccomodationComponent }   from './accomodation/accomodation.component';
// import { MufasaComponent }   from './mufasa/mufasa.component';
// import { VolunteerComponent }   from './volunteer/volunteer.component';
// import { GeneralComponent }   from './general/general.component';
// import { TableComponent }   from './table/table.component';
// import { EnquiryComponent } from './enquiry/enquiry.component';
// import { AddClientComponent } from './add-client/add-client.component';


import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // RouterModule.forRoot(AppRoutes),
    // SidebarModule,
    // NavbarModule,
    HttpModule,
    // FooterModule,
    // FixedPluginModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AuthModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBr-tgUtpm8cyjYVQDrjs8YpZH7zBNWPuY'}),
    // InfiniteScrollModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
