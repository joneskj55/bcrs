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
import { Component, NgModule } from '@angular/core';
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
import { ServerErrorComponent } from './pages/server-error/server-error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RoleListComponent } from './pages/role-list/role-list.component';

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
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
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
      {
        path: 'roles',
        component: RoleListComponent,
      },
      {
        path: 'server-error',
        component: ServerErrorComponent,
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
        component: RegisterComponent,
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
      {
        path: '404',
        component: NotFoundComponent,
      },
      {
        path: '500',
        component: ServerErrorComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'session/404',
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
