import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/account/login/login.component';
import {RegisterComponent} from './pages/account/register/register.component';
import {DashboardComponent} from './pages/space/dashboard/dashboard.component';
import {MessagesComponent} from './pages/space/messages/messages.component';
import {ContactsComponent} from './pages/space/contacts/contacts.component';
import {BroadcastComponent} from './pages/space/broadcast/broadcast.component';
import {WorkflowsComponent} from './pages/space/workflows/workflows.component';
import {ReportsComponent} from './pages/space/reports/reports.component';
import {ProfileComponent} from './pages/account/profile/profile.component';
import {NotificationsComponent} from './pages/account/notifications/notifications.component';
import {
  WorkspaceSettingGeneralComponent
} from './pages/space/settings/workspace-setting-general/workspace-setting-general.component';
import {
  WorkspaceSettingUsersComponent
} from './pages/space/settings/workspace-setting-users/workspace-setting-users.component';
import {
  WorkspaceSettingTeamsComponent
} from './pages/space/settings/workspace-setting-teams/workspace-setting-teams.component';
import {
  WorkspaceSettingChannelsComponent
} from './pages/space/settings/workspace-setting-channels/workspace-setting-channels.component';
import {
  WorkspaceSettingIntegrationsComponent
} from './pages/space/settings/workspace-setting-integrations/workspace-setting-integrations.component';
import {
  WorkspaceSettingContactFieldsComponent
} from './pages/space/settings/workspace-setting-contact-fields/workspace-setting-contact-fields.component';
import {
  WorkspaceSettingClosingNotesComponent
} from './pages/space/settings/workspace-setting-closing-notes/workspace-setting-closing-notes.component';
import {
  WorkspaceSettingSnippetsComponent
} from './pages/space/settings/workspace-setting-snippets/workspace-setting-snippets.component';
import {
  WorkspaceSettingFilesComponent
} from './pages/space/settings/workspace-setting-files/workspace-setting-files.component';
import {
  WorkspaceSettingExportComponent
} from './pages/space/settings/workspace-setting-export/workspace-setting-export.component';
import {
  OrganizationSettingGeneralComponent
} from './pages/organization/settings/organization-setting-general/organization-setting-general.component';
import {
  OrganizationSettingUsersComponent
} from './pages/organization/settings/organization-setting-users/organization-setting-users.component';
import {
  OrganizationSettingWorkspacesComponent
} from './pages/organization/settings/organization-setting-workspaces/organization-setting-workspaces.component';
import {
  OrganizationSettingUsageComponent
} from './pages/organization/settings/organization-setting-usage/organization-setting-usage.component';
import {
  OrganizationSettingBillingComponent
} from './pages/organization/settings/organization-setting-billing/organization-setting-billing.component';
import {NavbarComponent} from './components/layout/navbar/navbar.component';
import {MatButtonModule} from "@angular/material/button";
import {MatRippleModule} from "@angular/material/core";
import {ForgotComponent} from './pages/account/forgot/forgot.component';
import {ProfileSideBarComponent} from './components/layout/profile-side-bar/profile-side-bar.component';
import {MatMenuModule} from "@angular/material/menu";
import {LoadingComponent} from './components/layout/loading/loading.component';
import {HttpInterceptor} from "./services/core/http.interceptor";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppInitializerFactory, AppInitializerProvider} from "./services/core/app-initializer-provider.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {YoutubeUrlPipe} from "./pipes/youtube-url.pipe";
import {TrustUrlPipe} from "./pipes/trust-url.pipe";
import {TrustHtmlPipe} from "./pipes/trust-html.pipe";
import {TruncatePipe} from "./pipes/truncate.pipe";
import {TranslatePipe} from "./pipes/translate.pipe";
import {StringFormatPipe} from "./pipes/string-format.pipe";
import {SearchPipe} from "./pipes/search.pipe";
import {SanitizeHtmlPipe} from "./pipes/sanisize-html.pipe";
import {LocalTimePipe} from "./pipes/local-time.pipe";
import {LocalDatePipe} from "./pipes/local-date.pipe";
import {FilterPipe} from "./pipes/filter.pipe";
import {EnterToBrPipe} from "./pipes/enter-to-br.pipe";
import {CulturedDatePipe} from "./pipes/cultured-date.pipe";
import {AnonymousGuard} from "./guards/anonymous.guard";
import {AuthGuard} from "./guards/auth.guard";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {GridComponent} from "./components/core/grid/grid.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {BoxGridComponent} from "./components/core/box-grid/box-grid.component";
import {CountryPickerComponent} from "./components/core/country-picker/country-picker.component";
import {DatePickerComponent} from "./components/core/date-picker/date-picker.component";
import {NativeDatePickerComponent} from "./components/core/native-date-picker/native-date-picker.component";
import {CountryFlagComponent} from "./components/core/country-flag/country-flag.component";
import {FlagedPhoneNumberComponent} from "./components/core/flaged-phone-number/flaged-phone-number.component";
import {MatInputModule} from "@angular/material/input";
import {CtrlClickDirective} from "./directives/core/ctrl-click.directive";
import {GridCellDefDirective} from "./directives/core/grid-cell-def.directive";
import {OnlyNumberDirective} from "./directives/core/only-number.directive";
import {ReloadOnParamsChangedDirective} from "./directives/core/reload-on-params-changed.directive";
import {ThumbnailPreviewDirective} from "./directives/core/thumbnail-preview.directive";
import {TimeMaskDirective} from "./directives/core/time-mask.directive";
import {FocusOnShowDirective} from "./directives/core/focus-on-show.directive";
import {PlatformModule} from '@angular/cdk/platform';

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
    NavbarComponent,
    ForgotComponent,
    ProfileSideBarComponent,
    LoadingComponent,

    YoutubeUrlPipe,
    TrustUrlPipe,
    TrustHtmlPipe,
    TruncatePipe,
    TranslatePipe,
    StringFormatPipe,
    SearchPipe,
    SanitizeHtmlPipe,
    LocalTimePipe,
    LocalDatePipe,
    FilterPipe,
    EnterToBrPipe,
    CulturedDatePipe,
    GridComponent,
    BoxGridComponent,
    CountryPickerComponent,
    DatePickerComponent,
    NativeDatePickerComponent,
    CountryFlagComponent,
    FlagedPhoneNumberComponent,
    CtrlClickDirective,
    GridCellDefDirective,
    OnlyNumberDirective,
    ReloadOnParamsChangedDirective,
    ThumbnailPreviewDirective,
    TimeMaskDirective,
    FocusOnShowDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatRippleModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    PlatformModule,
    // ServiceWorkerModule.register('pwa-service-worker.js', {
    //   enabled: environment.pwa,
    // }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializerFactory,
      deps: [AppInitializerProvider],
      multi: true,
    },
    AppInitializerProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
