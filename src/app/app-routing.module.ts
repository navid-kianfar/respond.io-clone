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
import {
  WorkspaceSettingGeneralComponent
} from "./pages/space/settings/workspace-setting-general/workspace-setting-general.component";
import {
  WorkspaceSettingExportComponent
} from "./pages/space/settings/workspace-setting-export/workspace-setting-export.component";
import {
  WorkspaceSettingFilesComponent
} from "./pages/space/settings/workspace-setting-files/workspace-setting-files.component";
import {
  WorkspaceSettingSnippetsComponent
} from "./pages/space/settings/workspace-setting-snippets/workspace-setting-snippets.component";
import {
  WorkspaceSettingClosingNotesComponent
} from "./pages/space/settings/workspace-setting-closing-notes/workspace-setting-closing-notes.component";
import {
  WorkspaceSettingIntegrationsComponent
} from "./pages/space/settings/workspace-setting-integrations/workspace-setting-integrations.component";
import {
  WorkspaceSettingContactFieldsComponent
} from "./pages/space/settings/workspace-setting-contact-fields/workspace-setting-contact-fields.component";
import {
  WorkspaceSettingChannelsComponent
} from "./pages/space/settings/workspace-setting-channels/workspace-setting-channels.component";
import {
  WorkspaceSettingTeamsComponent
} from "./pages/space/settings/workspace-setting-teams/workspace-setting-teams.component";
import {
  WorkspaceSettingUsersComponent
} from "./pages/space/settings/workspace-setting-users/workspace-setting-users.component";
import {
  OrganizationSettingGeneralComponent
} from "./pages/organization/settings/organization-setting-general/organization-setting-general.component";
import {
  OrganizationSettingBillingComponent
} from "./pages/organization/settings/organization-setting-billing/organization-setting-billing.component";
import {
  OrganizationSettingUsageComponent
} from "./pages/organization/settings/organization-setting-usage/organization-setting-usage.component";
import {
  OrganizationSettingWorkspacesComponent
} from "./pages/organization/settings/organization-setting-workspaces/organization-setting-workspaces.component";
import {
  OrganizationSettingUsersComponent
} from "./pages/organization/settings/organization-setting-users/organization-setting-users.component";

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
  { path: 'space/:space-id/settings/general', component: WorkspaceSettingGeneralComponent },
  { path: 'space/:space-id/settings/users', component: WorkspaceSettingUsersComponent },
  { path: 'space/:space-id/settings/teams', component: WorkspaceSettingTeamsComponent },
  { path: 'space/:space-id/settings/channels', component: WorkspaceSettingChannelsComponent },
  { path: 'space/:space-id/settings/contact-fields', component: WorkspaceSettingContactFieldsComponent },
  { path: 'space/:space-id/settings/integrations', component: WorkspaceSettingIntegrationsComponent },
  { path: 'space/:space-id/settings/closing-notes', component: WorkspaceSettingClosingNotesComponent },
  { path: 'space/:space-id/settings/snippets', component: WorkspaceSettingSnippetsComponent },
  { path: 'space/:space-id/settings/files', component: WorkspaceSettingFilesComponent },
  { path: 'space/:space-id/settings/export', component: WorkspaceSettingExportComponent },


  { path: 'organization/:organization-id/settings/general', component: OrganizationSettingGeneralComponent },
  { path: 'organization/:organization-id/settings/users', component: OrganizationSettingUsersComponent },
  { path: 'organization/:organization-id/settings/workspaces', component: OrganizationSettingWorkspacesComponent },
  { path: 'organization/:organization-id/settings/usage', component: OrganizationSettingUsageComponent },
  { path: 'organization/:organization-id/settings/billing', component: OrganizationSettingBillingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
