import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './paegs/account/login/login.component';
import { RegisterComponent } from './paegs/account/register/register.component';
import { DashboardComponent } from './paegs/space/dashboard/dashboard.component';
import { MessagesComponent } from './paegs/space/messages/messages.component';
import { ContactsComponent } from './paegs/space/contacts/contacts.component';
import { BroadcastComponent } from './paegs/space/broadcast/broadcast.component';
import { WorkflowsComponent } from './paegs/space/workflows/workflows.component';
import { ReportsComponent } from './paegs/space/reports/reports.component';
import { ProfileComponent } from './paegs/account/profile/profile.component';
import { NotificationsComponent } from './paegs/account/notifications/notifications.component';
import { WorkspaceSettingGeneralComponent } from './paegs/space/settings/workspace-setting-general/workspace-setting-general.component';
import { WorkspaceSettingUsersComponent } from './paegs/space/settings/workspace-setting-users/workspace-setting-users.component';
import { WorkspaceSettingTeamsComponent } from './paegs/space/settings/workspace-setting-teams/workspace-setting-teams.component';
import { WorkspaceSettingChannelsComponent } from './paegs/space/settings/workspace-setting-channels/workspace-setting-channels.component';
import { WorkspaceSettingIntegrationsComponent } from './paegs/space/settings/workspace-setting-integrations/workspace-setting-integrations.component';
import { WorkspaceSettingContactFieldsComponent } from './paegs/space/settings/workspace-setting-contact-fields/workspace-setting-contact-fields.component';
import { WorkspaceSettingClosingNotesComponent } from './paegs/space/settings/workspace-setting-closing-notes/workspace-setting-closing-notes.component';
import { WorkspaceSettingSnippetsComponent } from './paegs/space/settings/workspace-setting-snippets/workspace-setting-snippets.component';
import { WorkspaceSettingFilesComponent } from './paegs/space/settings/workspace-setting-files/workspace-setting-files.component';
import { WorkspaceSettingExportComponent } from './paegs/space/settings/workspace-setting-export/workspace-setting-export.component';
import { OrganizationSettingGeneralComponent } from './paegs/organization/settings/organization-setting-general/organization-setting-general.component';
import { OrganizationSettingUsersComponent } from './paegs/organization/settings/organization-setting-users/organization-setting-users.component';
import { OrganizationSettingWorkspacesComponent } from './paegs/organization/settings/organization-setting-workspaces/organization-setting-workspaces.component';
import { OrganizationSettingUsageComponent } from './paegs/organization/settings/organization-setting-usage/organization-setting-usage.component';
import { OrganizationSettingBillingComponent } from './paegs/organization/settings/organization-setting-billing/organization-setting-billing.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MessagesComponent,
    ContactsComponent,
    BroadcastComponent,
    WorkflowsComponent,
    ReportsComponent,
    ProfileComponent,
    NotificationsComponent,
    WorkspaceSettingGeneralComponent,
    WorkspaceSettingUsersComponent,
    WorkspaceSettingTeamsComponent,
    WorkspaceSettingChannelsComponent,
    WorkspaceSettingIntegrationsComponent,
    WorkspaceSettingContactFieldsComponent,
    WorkspaceSettingClosingNotesComponent,
    WorkspaceSettingSnippetsComponent,
    WorkspaceSettingFilesComponent,
    WorkspaceSettingExportComponent,
    OrganizationSettingGeneralComponent,
    OrganizationSettingUsersComponent,
    OrganizationSettingWorkspacesComponent,
    OrganizationSettingUsageComponent,
    OrganizationSettingBillingComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
