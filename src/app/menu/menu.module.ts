import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// app
import { SHARED_MODULES, COMPONENT_DECLARATIONS, COMPONENT_EXPORTS } from './menu.common';

@NgModule({
    imports: [
        RouterModule,
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
