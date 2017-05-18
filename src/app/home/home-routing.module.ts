import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// app
import { HomeRoutes } from './home.routes';

@NgModule({
    imports: [
        RouterModule.forChild(HomeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }
