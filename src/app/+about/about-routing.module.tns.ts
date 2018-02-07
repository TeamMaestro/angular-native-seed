// angular
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
// app
import { AboutRoutes } from './about.routes';

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(<any>AboutRoutes),
    ],
    exports: [NativeScriptRouterModule]
})
export class AboutRoutingModule { }

