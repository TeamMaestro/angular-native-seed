import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
    declarations: [],
    exports: [
        NativeScriptFormsModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class SharedModule { }
