import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { RegistrationComponent } from './components/registration/registration.component';
import { ViewmentorshipprogramComponent } from './components/viewmentorshipprogram/viewmentorshipprogram.component';

const routes: Routes = [
  // {path:'', component:RegistrationComponent},
  {path:'', component:ViewmentorshipprogramComponent}

=======
>>>>>>> f18577e8ad1336cedb724558ab3f2359145a3f63
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
