// angular
import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
// app
import { AppRoutes } from './app.routes';

@NgModule({
    imports: [
        NativeScriptRouterModule.forRoot(<any>AppRoutes),
    ],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

