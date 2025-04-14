import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { AuthGuard } from './components/auth.guard';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'adminnav', component: AdminnavComponent, canActivate: [AuthGuard] },
  { path: 'usernav', component: UsernavComponent, canActivate: [AuthGuard]},
  {path: 'creatementorshipprogram', component: CreatementorshipprogramComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
