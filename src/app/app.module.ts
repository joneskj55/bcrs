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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { MatCardModule } from '@angular/material/card';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResetPasswordFormComponent } from './shared/forms/reset-password-form/reset-password-form.component';
import { VerifySecurityQuestionsFormComponent } from './shared/forms/verify-security-questions-form/verify-security-questions-form.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { VerifyUsernameFormComponent } from './shared/forms/verify-username-form/verify-username-form.component';
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { ErrorInterceptor } from './shared/error.interceptor';

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
    ServerErrorComponent,
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
    NgbModule,
    MessagesModule,
    MessageModule,
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
