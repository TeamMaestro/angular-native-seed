import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular';
// app
import { SHARED_MODULES, COMPONENT_DECLARATIONS, COMPONENT_EXPORTS } from './menu.common';

@NgModule({
    imports: [
        NativeScriptRouterModule,
        ...SHARED_MODULES
    ],
    declarations: [
        ...COMPONENT_DECLARATIONS
    ],
    exports: [
        ...COMPONENT_EXPORTS
    ]
})
export class MenuModule { }
