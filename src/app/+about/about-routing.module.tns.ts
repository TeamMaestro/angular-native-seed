import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
// app
import { AboutRoutes } from './about.routes';

@NgModule({
    imports: [
        NativeScriptRouterModule.forChild(<any>AboutRoutes)
    ],
    exports: [
        NativeScriptRouterModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AboutRoutingModule { }
