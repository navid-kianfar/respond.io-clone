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
import {AuthGuard} from "./guards/auth.guard";
import {AnonymousGuard} from "./guards/anonymous.guard";

const routes: Routes = [
  { path: 'account/login', component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: 'account/register', component: RegisterComponent, canActivate: [AnonymousGuard] },
  { path: 'account/forgot', component: ForgotComponent, canActivate: [AnonymousGuard] },
  { path: 'account/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'account/notifications', component: NotificationsComponent, canActivate: [AuthGuard] },

  { path: 'space/:space-id/dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/message', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/contact', component: ContactsComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/broadcast', component: BroadcastComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/workflows', component: WorkflowsComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/settings/general', component: WorkspaceSettingGeneralComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/settings/users', component: WorkspaceSettingUsersComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/settings/teams', component: WorkspaceSettingTeamsComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/settings/channels', component: WorkspaceSettingChannelsComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/settings/contact-fields', component: WorkspaceSettingContactFieldsComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/settings/integrations', component: WorkspaceSettingIntegrationsComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/settings/closing-notes', component: WorkspaceSettingClosingNotesComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/settings/snippets', component: WorkspaceSettingSnippetsComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/settings/files', component: WorkspaceSettingFilesComponent, canActivate: [AuthGuard] },
  { path: 'space/:space-id/settings/export', component: WorkspaceSettingExportComponent, canActivate: [AuthGuard] },


  { path: 'organization/:organization-id/settings/general', component: OrganizationSettingGeneralComponent, canActivate: [AuthGuard] },
  { path: 'organization/:organization-id/settings/users', component: OrganizationSettingUsersComponent, canActivate: [AuthGuard] },
  { path: 'organization/:organization-id/settings/workspaces', component: OrganizationSettingWorkspacesComponent, canActivate: [AuthGuard] },
  { path: 'organization/:organization-id/settings/usage', component: OrganizationSettingUsageComponent, canActivate: [AuthGuard] },
  { path: 'organization/:organization-id/settings/billing', component: OrganizationSettingBillingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
