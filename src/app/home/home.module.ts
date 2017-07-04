import { NgModule, Optional, SkipSelf } from '@angular/core';
// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { HomeComponent } from './components/home/home.component';
import { HomeRoutes } from './home.routes';
// common
import { SharedModule } from '../shared';
import { RouterModule } from '../common';

@NgModule({
    imports: [
        SharedModule,

        RouterModule.forChild(<any>HomeRoutes),
        TranslateModule.forChild()
    ],
    declarations: [HomeComponent]
})
export class HomeModule {

    constructor( @Optional() @SkipSelf() parentModule: HomeModule) {
        if (parentModule) {
            throw new Error('HomeModule already loaded; Import in root module only.');
        }
    }
}
