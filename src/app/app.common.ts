import { AppRoutingModule } from './app-routing.module';
// demo
import { HomeModule } from './home/home.module';
import { MenuModule } from './menu/menu.module';

export const SHARED_MODULES: any[] = [
    AppRoutingModule,
    HomeModule,
    MenuModule
];

export * from './app-routing.module';
