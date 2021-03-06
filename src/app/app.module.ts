/*
============================================
; Title:  app.module.ts
; Author: Professor Krasso
; Modified by: Fred Marble, Tony Henderson, Kevin Jones
; Date: 17 Sep 2021
; Description: App module
;===========================================
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// HTTP
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

// Flex
import { FlexLayoutModule } from '@angular/flex-layout';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// PrimeNG
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResetPasswordFormComponent } from './shared/forms/reset-password-form/reset-password-form.component';
import { VerifySecurityQuestionsFormComponent } from './shared/forms/verify-security-questions-form/verify-security-questions-form.component';
import { VerifyUsernameFormComponent } from './shared/forms/verify-username-form/verify-username-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { ErrorInterceptor } from './shared/error.interceptor';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
import { AddInvoiceItemDialogComponent } from './shared/add-invoice-item-dialog/add-invoice-item-dialog.component';
import { InvoiceDialogComponent } from './shared/invoice-dialog/invoice-dialog.component';
import { PrintInvoiceDialogComponent } from './shared/print-invoice-dialog/print-invoice-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,
    SignInComponent,
    DeleteRecordDialogComponent,
    SecurityQuestionListComponent,
    UserListComponent,
    UserCreateComponent,
    UserDetailsComponent,
    SecurityQuestionDetailsComponent,
    SecurityQuestionCreateComponent,
    NotFoundComponent,
    ResetPasswordFormComponent,
    VerifySecurityQuestionsFormComponent,
    VerifyUsernameFormComponent,
    RegisterComponent,
    ServerErrorComponent,
    AboutComponent,
    ContactComponent,
    RoleListComponent,
    RoleCreateComponent,
    RoleDetailsComponent,
    PurchasesByServiceGraphComponent,
    AddInvoiceItemDialogComponent,
    InvoiceDialogComponent,
    PrintInvoiceDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    MatStepperModule,
    MatSelectModule,
    ChartModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
