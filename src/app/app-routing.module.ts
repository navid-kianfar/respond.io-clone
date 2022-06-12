import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./paegs/account/login/login.component";
import {RegisterComponent} from "./paegs/account/register/register.component";
import {NotificationsComponent} from "./paegs/account/notifications/notifications.component";
import {DashboardComponent} from "./paegs/space/dashboard/dashboard.component";
import {ContactsComponent} from "./paegs/space/contacts/contacts.component";
import {MessagesComponent} from "./paegs/space/messages/messages.component";
import {BroadcastComponent} from "./paegs/space/broadcast/broadcast.component";
import {WorkflowsComponent} from "./paegs/space/workflows/workflows.component";
import {ReportsComponent} from "./paegs/space/reports/reports.component";
import {ProfileComponent} from "./paegs/account/profile/profile.component";

const routes: Routes = [
  { path: 'account/login', component: LoginComponent },
  { path: 'account/register', component: RegisterComponent },
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
