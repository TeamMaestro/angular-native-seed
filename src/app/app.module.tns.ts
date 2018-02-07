import { NgModule, NO_ERRORS_SCHEMA, NgModuleFactoryLoader } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';

// nativescript
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
// vendor dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// app
import { Config } from './common/index';
import { AppComponent } from './app.component';
import { SHARED_MODULES } from './app.common';
import { AppRoutes } from './app.routes';
Config.PLATFORM_TARGET = Config.PLATFORMS.MOBILE_NATIVE;

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(<any>http, '/assets/i18n/', '.json');
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptHttpClientModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        NativeScriptRouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (HttpLoaderFactory),
                deps: [HttpClient]
            }
        }),
        ...SHARED_MODULES
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        // Allows your {N} application to use lazy-loading
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
