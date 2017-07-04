import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { AboutComponent } from './components/about/about.component';
import { AboutRoutes } from './about.routes';
// common
import { SharedModule } from '../shared';
import { RouterModule } from '../common';

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
