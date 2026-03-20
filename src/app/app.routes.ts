import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { FormBuilder } from './pages/form-builder/form-builder';

export const routes: Routes = [
    {path: "", component: Home},
    {path: "create", component: FormBuilder},
    {path: "**", redirectTo: ""}
];
