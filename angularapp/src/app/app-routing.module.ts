import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';
import { MentorshipapplicationformComponent } from './components/mentorshipapplicationform/mentorshipapplicationform.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';
import { AuthGuard } from './components/authguard/auth.guard';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { RequestedmentorshipapplicationComponent } from './components/requestedmentorshipapplication/requestedmentorshipapplication.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
import { MentorshipapplicationlistComponent } from './components/mentorshipapplicationlist/mentorshipapplicationlist.component';
import { UserappliedmentorshipprogramComponent } from './components/userappliedmentorshipprogram/userappliedmentorshipprogram.component';


const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegistrationComponent },

  {path: 'admin', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'user', component:HomeComponent, canActivate: [AuthGuard]},
  {path: 'user/addFeedback', component: UseraddfeedbackComponent, canActivate: [AuthGuard]},
  {path: 'user/appliedmentorshipapplication',component:UserappliedmentorshipprogramComponent, canActivate: [AuthGuard]},
  {path: 'user/viewFeedback', component: UserviewfeedbackComponent, canActivate: [AuthGuard]},
  {path: 'user/viewmentorshipprogram', component: UserviewmentorshipprogramComponent, canActivate: [AuthGuard]},
  {path: 'admin/viewmentorshipprogram', component: ViewmentorshipprogramComponent, canActivate: [AuthGuard]},
  {path: 'user/viewmentorshipprogram/:id',component: UserviewmentorshipprogramComponent, canActivate: [AuthGuard]},
  {path: 'user/mentorshipapplicationform/:id', component: MentorshipapplicationformComponent, canActivate: [AuthGuard]},
  {path: 'admin/creatementorshipprogram',component:CreatementorshipprogramComponent,canActivate: [AuthGuard]},
  {path: 'admin/editmentorshipprogram',component: AdmineditmentorshipprogramComponent, canActivate: [AuthGuard]},
  //{path: 'admin/viewFeedback', component: AdminviewfeedbackComponent},
  {path: 'admin/mentorshipapplicationlist',component:MentorshipapplicationlistComponent, canActivate:[AuthGuard]},
  {path: 'admin/requestedmentorshipapplication', component:RequestedmentorshipapplicationComponent, canActivate: [AuthGuard]},
  {path: 'admin/viewmentorshipprogram', component:ViewmentorshipprogramComponent, canActivate: [AuthGuard]},
  {path: 'adminviewFeedback',component:AdminviewfeedbackComponent,canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
