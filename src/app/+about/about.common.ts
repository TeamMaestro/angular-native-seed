import { CommonModule } from '@angular/common';
// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';

export const SHARED_MODULES: any[] = [
    AboutRoutingModule,
    CommonModule,

    TranslateModule.forChild(),
];

export const COMPONENT_DECLARATIONS: any[] = [
    AboutComponent
];
