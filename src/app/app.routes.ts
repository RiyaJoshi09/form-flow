import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FormBuilder } from './pages/form-builder/form-builder';
import { NotFound } from './pages/not-found/not-found';
import { FormSubmission } from './pages/form-submission/form-submission';
import { Login } from './pages/login/login';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: "full"},
    {path: "login", component: Login},
    
    {path: "home", component: Home, canActivate: [authGuard]},
    {path: "create", component: FormBuilder,canActivate: [authGuard]},

    {path: "form/:id", component: FormSubmission},
    { path: 'edit-form/:id', component: FormBuilder },
    // {path: "**", component:NotFound
    // {path: "**", redirectTo: ""},
    {path: "**", component:NotFound}
];
