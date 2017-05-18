import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// app
import { AboutRoutes } from './about.routes';

@NgModule({
    imports: [
        RouterModule.forChild(AboutRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AboutRoutingModule { }
