// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { SharedModule } from '../shared';
import { RouterModule } from '../common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';

export const SHARED_MODULES: any[] = [
    SharedModule,
    AboutRoutingModule,
    TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
    AboutComponent
];
