import { Routes } from '@angular/router';
import { TestComponent } from './Test/test';

export const routes: Routes = [
    { path: '', redirectTo: '/test', pathMatch: 'full' },
    { path: 'test', component: TestComponent }
];
