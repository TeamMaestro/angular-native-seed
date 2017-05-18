import { CommonModule } from '@angular/common';
// vendor dependencies
import { TranslateModule } from '@ngx-translate/core';
// app
import { MenuComponent } from './components/menu/menu.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';

export const SHARED_MODULES: any = [
    CommonModule,
    TranslateModule
];

export const COMPONENT_DECLARATIONS: any[] = [
    MenuComponent,
    MenuItemComponent
];

export const COMPONENT_EXPORTS: any[] = [
    MenuComponent
];

export * from './interfaces/MenuItem';
