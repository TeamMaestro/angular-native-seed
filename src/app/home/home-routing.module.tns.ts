import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
// app
import { HomeRoutes } from './home.routes';

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(<any>HomeRoutes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class HomeRoutingModule { }
