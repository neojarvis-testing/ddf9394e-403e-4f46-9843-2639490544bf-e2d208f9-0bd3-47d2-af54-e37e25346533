import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';
import { UserappliedmentorshipapplicationComponent } from './components/userappliedmentorshipapplication/userappliedmentorshipapplication.component';
import { MentorshipapplicationformComponent } from './components/mentorshipapplicationform/mentorshipapplicationform.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';

const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'adminnav', component: AdminnavComponent },
  { path: 'usernav', component: UsernavComponent },
  { path: 'viewmentorshipprogram', component:ViewmentorshipprogramComponent},
  { path: 'userviewmentorshipprogram', component: UserviewmentorshipprogramComponent },
  { path: 'userappliedmentorshipapplication', component: UserappliedmentorshipapplicationComponent},
  { path: 'mentorshipapplicationform', component: MentorshipapplicationformComponent},
  { path: 'admineditmentorshipprogram', component:AdmineditmentorshipprogramComponent},
  { path: 'userviewmentorshipprogram', component: UserviewmentorshipprogramComponent },
  { path: 'userappliedmentorshipapplication', component: UserappliedmentorshipapplicationComponent},
  { path: 'mentorshipapplicationform', component: MentorshipapplicationformComponent},
  { path:'adminviewfeedback', component:AdminviewfeedbackComponent},
  { path: 'useraddfeedback', component: UseraddfeedbackComponent},
  { path: 'userviewfeedback', component: UserviewfeedbackComponent}


];







 


  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }