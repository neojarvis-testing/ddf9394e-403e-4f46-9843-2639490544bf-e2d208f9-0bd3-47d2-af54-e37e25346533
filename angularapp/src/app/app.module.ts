import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdmineditmentorshipprogramComponent } from './components/admineditmentorshipprogram/admineditmentorshipprogram.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MentorshipapplicationformComponent } from './components/mentorshipapplicationform/mentorshipapplicationform.component';
import { MentorshipapplicationlistComponent } from './components/mentorshipapplicationlist/mentorshipapplicationlist.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RequestedmentorshipapplicationComponent } from './components/requestedmentorshipapplication/requestedmentorshipapplication.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UserappliedmentorshipapplicationComponent } from './components/userappliedmentorshipapplication/userappliedmentorshipapplication.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewmentorshipprogramComponent } from './components/userviewmentorshipprogram/userviewmentorshipprogram.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AdmineditmentorshipprogramComponent,
    AdminnavComponent,
    AdminviewfeedbackComponent,
    CreatementorshipprogramComponent,
    ErrorComponent,
    HomeComponent,
    LoginComponent,
    MentorshipapplicationformComponent,
    MentorshipapplicationlistComponent,
    NavbarComponent,
    RegistrationComponent,
    RequestedmentorshipapplicationComponent,
    UseraddfeedbackComponent,
    UserappliedmentorshipapplicationComponent,
    UsernavComponent,
    UserviewfeedbackComponent,
    UserviewmentorshipprogramComponent,
    ViewmentorshipprogramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
