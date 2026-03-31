import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FormBuilder } from './pages/form-builder/form-builder';
import { NotFound } from './pages/not-found/not-found';
import { FormSubmission } from './pages/form-submission/form-submission';
import { Login } from './pages/login/login';
import { authGuard } from './auth.guard';
import { authInverseGuard } from './auth-inverse-guard';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "home", component: Home, canActivate: [authGuard]},
    {path: "login", component: Login, canActivate: [authInverseGuard]},
    // {path: "signup", component: Signup, canActivate: [authInverseGuard]},
    {path: "signup", component: Signup},
    {path: "create", component: FormBuilder,canActivate: [authGuard]},
    { path: 'edit-form/:id', component: FormBuilder, canActivate: [authGuard]},
    {path: "form/:id", component: FormSubmission},
    {path: "**", component:NotFound}
];
