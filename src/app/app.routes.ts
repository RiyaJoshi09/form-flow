import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FormBuilder } from './pages/form-builder/form-builder';
import { NotFound } from './pages/not-found/not-found';
import { FormSubmission } from './pages/form-submission/form-submission';

export const routes: Routes = [
    {path: "", component: Home},
    {path: "create", component: FormBuilder},

    {path: "form/:id", component: FormSubmission},
    { path: 'edit-form/:id', component: FormBuilder },

    // {path: "**", component:NotFound
    // {path: "**", redirectTo: ""},
    {path: "**", component:NotFound}
];
