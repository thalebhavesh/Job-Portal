import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { JobService } from './Services/job.service';
import { FindjobComponent } from './findjob/findjob.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FormsModule } from '@angular/forms';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { AddjobComponent } from './addjob/addjob.component';
import { ApplyComponent } from './apply/apply.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FindjobComponent,
    AboutusComponent,
    ContactusComponent,
    JobdetailsComponent,
    AddjobComponent,
    ApplyComponent,
    ViewdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [JobService],
  bootstrap: [AppComponent]
})
export class AppModule { }
