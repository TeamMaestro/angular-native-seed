import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http, HttpModule } from '@angular/http';
// vendor dependencies
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// app
import { Config } from './common/index';
import { AppComponent } from './app.component';

import { NoContent } from './no-content';
import { IssuesModule } from './issues';
import { DashboardModule } from './dashboard';
import { ProfileModule } from './profile';
import { SigninModule } from './signin';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';

Config.PLATFORM_TARGET = Config.PLATFORMS.WEB;

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(<any>http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [ AppComponent ],
    imports: [
        BrowserAnimationsModule,
        HttpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [Http]
            }
        }),
        DashboardModule,
        IssuesModule,
        ProfileModule,
        SigninModule,
        RouterModule.forRoot(AppRoutes)
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {}
