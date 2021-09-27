/*
============================================
; Title:  app-routing.module.ts
; Author: Professor Krasso
; Modified by: Fred Marble, George Henderson, Kevin Jones
; Date: 17 Sep 2021
; Description: Routing file
;===========================================
*/

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthGuard } from './shared/auth.guard';
import { UserListComponent } from './pages/user-list/user-list.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { ResetPasswordFormComponent } from './shared/forms/reset-password-form/reset-password-form.component';
import { VerifySecurityQuestionsFormComponent } from './shared/forms/verify-security-questions-form/verify-security-questions-form.component';
import { VerifyUsernameFormComponent } from './shared/forms/verify-username-form/verify-username-form.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'users',
        component: UserListComponent,
      },
      {
        path: 'users/:userId',
        component: UserDetailsComponent,
      },
      {
        path: 'users/create/new',
        component: UserCreateComponent,
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent,
      },
      {
        path: 'security-questions/:id',
        component: SecurityQuestionDetailsComponent,
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'session',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SignInComponent,
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'forgot',
        component: VerifyUsernameFormComponent,
      },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsFormComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false,
      scrollPositionRestoration: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
