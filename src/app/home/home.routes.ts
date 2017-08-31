import { Routes } from '@angular/router';
// app
import { HomeComponent } from './components/home/home.component';
import { GridComponent } from "../grid/grid.component";

export const HomeRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'about',
        loadChildren: 'app/+about/about.module#AboutModule'
    },
    {
        path: 'grid',
        component: GridComponent
    }
];
