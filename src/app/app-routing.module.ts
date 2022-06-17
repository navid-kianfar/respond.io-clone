import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/account/login/login.component";
import {RegisterComponent} from "./pages/account/register/register.component";
import {NotificationsComponent} from "./pages/account/notifications/notifications.component";
import {DashboardComponent} from "./pages/space/dashboard/dashboard.component";
import {ContactsComponent} from "./pages/space/contacts/contacts.component";
import {MessagesComponent} from "./pages/space/messages/messages.component";
import {BroadcastComponent} from "./pages/space/broadcast/broadcast.component";
import {WorkflowsComponent} from "./pages/space/workflows/workflows.component";
import {ReportsComponent} from "./pages/space/reports/reports.component";
import {ProfileComponent} from "./pages/account/profile/profile.component";
import {ForgotComponent} from "./pages/account/forgot/forgot.component";

const routes: Routes = [
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
  { path: 'account/forgot', component: ForgotComponent },
  { path: 'account/profile', component: ProfileComponent },
  { path: 'account/notifications', component: NotificationsComponent },
  { path: 'space/:space-id/dashboard', component: DashboardComponent },
  { path: 'space/:space-id/message', component: MessagesComponent },
  { path: 'space/:space-id/contact', component: ContactsComponent },
  { path: 'space/:space-id/broadcast', component: BroadcastComponent },
  { path: 'space/:space-id/workflows', component: WorkflowsComponent },
  { path: 'space/:space-id/reports', component: ReportsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
