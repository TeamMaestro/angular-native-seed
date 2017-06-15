import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

import { NativeScriptRouterModule } from 'nativescript-angular';
export { NativeScriptRouterModule as RouterModule } from 'nativescript-angular';

@NgModule({
  declarations: [],
  exports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    NativeScriptRouterModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class SharedModule { }
