import { CommonModule } from '@angular/common';
// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { HomeRoutingModule } from './home-routing.module';

export const SHARED_MODULES: any[] = [
    CommonModule,
    HomeRoutingModule,
    TranslateModule.forChild()
];
