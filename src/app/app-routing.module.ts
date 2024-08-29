import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FindjobComponent } from './findjob/findjob.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { JobdetailsComponent } from './jobdetails/jobdetails.component';
import { AddjobComponent } from './addjob/addjob.component';
import { ApplyComponent } from './apply/apply.component';
import { ViewdetailsComponent } from './viewdetails/viewdetails.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'find-jobs', component: FindjobComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'jobdetails/:id', component: JobdetailsComponent },
  { path: 'addjob', component: AddjobComponent },
  { path: 'apply/:id', component: ApplyComponent },
  { path: 'view-details', component: ViewdetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
