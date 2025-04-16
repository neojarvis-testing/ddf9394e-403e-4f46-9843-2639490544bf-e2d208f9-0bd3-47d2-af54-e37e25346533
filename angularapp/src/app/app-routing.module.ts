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

import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';
import { AuthGuard } from './components/authguard/auth.guard';

import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
 
const routes: Routes = [

  { path: '', component: HomeComponent },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {path: 'admin', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'user', component:HomeComponent, canActivate: [AuthGuard]},
  {path: 'user/addFeedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard]},
  {path: 'user/appliedmentorshipapplication',component:UserappliedmentorshipapplicationComponent, canActivate: [AuthGuard]},
  {path: 'user/viewFeedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard]},
  {path: 'user/viewmentorshipprogram', component: UserviewmentorshipprogramComponent, canActivate: [AuthGuard]},
  {path: 'user/viewmentorshipprogram/:id',component: UserviewmentorshipprogramComponent, canActivate: [AuthGuard]},
  {path: 'admin/creatementorshipprogram',component:CreatementorshipprogramComponent,canActivate: [AuthGuard]},
  {path: 'admin/editmentorshipprogram',component: AdmineditmentorshipprogramComponent, canActivate: [AuthGuard]},
  {path: 'admin/viewmentorshipprogram', component:ViewmentorshipprogramComponent, canActivate: [AuthGuard]},
  
  // { path: 'transaction-form/:type/:accid', component: TransactionformComponent,canActivate: [AuthGuard] },

  { path: 'adminnav', component: AdminnavComponent },
  { path: 'usernav', component: UsernavComponent },
  

  {path:'admin/editmentorshipprogram/:id', component:AdmineditmentorshipprogramComponent},
  // { path: 'userviewmentorshipprogram', component: UserviewmentorshipprogramComponent },
  // { path: 'userappliedmentorshipapplication', component: UserappliedmentorshipapplicationComponent},
  { path: 'mentorshipapplicationform', component: MentorshipapplicationformComponent},
  // {path: 'creatementorshipprogram', component: CreatementorshipprogramComponent}
];




 
 
 
 
 
 
 
 
 
 
  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 