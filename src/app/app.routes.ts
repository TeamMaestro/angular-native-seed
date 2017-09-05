import { Routes, RouterModule } from '@angular/router';
import { NoContent } from './no-content';
import { IssuesComponent } from './issues';
import { DashboardComponent } from './dashboard';
import { ProfileComponent } from './profile';
import { SigninComponent } from './signin';
/**
 * Define app module routes here, e.g., to lazily load a module
 * (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
 */
export const AppRoutes: Routes = [
    { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'issues',  component: IssuesComponent },
    { path: 'dashboard',  component: DashboardComponent },
    { path: 'profile',  component: ProfileComponent },
    { path: 'signin',  component: SigninComponent }
];
