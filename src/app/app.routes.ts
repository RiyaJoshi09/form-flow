import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FormBuilder } from './pages/form-builder/form-builder';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {path: "", component: Home},
    {path: "create", component: FormBuilder},
    // {path: "**", redirectTo: ""},
    {path: "**", component:NotFound}
];
