import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { AboutComponent } from './components/about/about.component';
import { AboutRoutes } from './about.routes';
// common
import { SharedModule, RouterModule } from '../shared';

@NgModule({
    imports: [
        SharedModule,

        RouterModule.forChild(<any>AboutRoutes),
        TranslateModule.forChild()
    ],
    declarations: [
        AboutComponent
    ]
})
export class AboutModule { }
