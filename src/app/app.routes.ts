import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FormBuilder } from './pages/form-builder/form-builder';
import { NotFound } from './pages/not-found/not-found';
import { FormSubmission } from './pages/form-submission/form-submission';
import { Login } from './pages/login/login';
import { authGuard } from './auth.guard';
import { authInverseGuard } from './auth-inverse-guard';
import { Signup } from './pages/signup/signup';
import { Logout } from './pages/logout/logout';
import { Assign } from './pages/assign/assign';
import { VerifyOtp } from './pages/verify-otp/verify-otp';
import { ForgotPassword } from './pages/forgot-password/forgot-password';

export const routes: Routes = [
    {path: "", redirectTo: "home", pathMatch: "full"},
    {path: "login", component: Login, canActivate: [authInverseGuard]},
    {path: "signup", component: Signup, canActivate: [authInverseGuard]},
    {path: "verify", component: VerifyOtp, canActivate: [authInverseGuard]},
    {path: "forgot-password", component: ForgotPassword, canActivate: [authInverseGuard]},
    {path: "assign/:id", component: Assign},
    {path: "home", component: Home, canActivate: [authGuard]},
    {path: "logout", component: Logout, canActivate: [authGuard]},
    {path: "create", component: FormBuilder,canActivate: [authGuard]},
    { path: 'edit-form/:id', component: FormBuilder, canActivate: [authGuard]},
    {path: "form/:id", component: FormSubmission},
    {path: "**", component:NotFound}
];
