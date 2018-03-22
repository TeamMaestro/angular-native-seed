import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
// nativescript
import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
// vendor dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES } from './app.common';

Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(<any>http, '/assets/i18n/', '.json');
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        // HttpClientModule,
        TranslateModule.forRoot(),
        // TranslateModule.forRoot({
        //     loader: {
        //         provide: TranslateLoader,
        //         useFactory: (createTranslateLoader),
        //         deps: [HttpClient]
        //     }
        // }),
        ...SHARED_MODULES
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
