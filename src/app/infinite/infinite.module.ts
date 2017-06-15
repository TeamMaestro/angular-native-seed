import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { InfiniteComponent } from './components/infinite/infinite.component';
import { ItemTemplateComponent } from './components/item-template/item-template.component';
import { InfiniteRoutes } from './infinite.routes';
// common
import { SharedModule, RouterModule } from '../shared';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    imports: [
        SharedModule,

        RouterModule.forChild(InfiniteRoutes),
        TranslateModule.forChild(),

        InfiniteScrollModule
    ],
    declarations: [InfiniteComponent, ItemTemplateComponent]
})
export class InfiniteModule {

    constructor( @Optional() @SkipSelf() parentModule: InfiniteModule) {
        if (parentModule) {
            throw new Error('InfiniteModule already loaded; Import in root module only.');
        }
    }
}
