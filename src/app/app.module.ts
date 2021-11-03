import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // If You need animations

import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
        path: '',
        component: SigninComponent
      }
    ])
  ],
  declarations: [
    AppComponent, 
    HeaderComponent, 
    SigninComponent, 
    DashboardComponent, LogoutComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
