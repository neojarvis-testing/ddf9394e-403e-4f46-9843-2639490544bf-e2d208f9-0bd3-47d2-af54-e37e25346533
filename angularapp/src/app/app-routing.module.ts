import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatementorshipprogramComponent } from './components/creatementorshipprogram/creatementorshipprogram.component';

const routes: Routes = [
  {path: 'creatementorshipprogram', component: CreatementorshipprogramComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
