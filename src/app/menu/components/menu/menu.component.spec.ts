import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { MenuComponent } from './menu.component';

@Component({
    selector: 'seed-menu-item',
    template: ``
})
class MockSeedMenuItemComponent {
    @Input() item: any;
}

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MenuComponent,
                MockSeedMenuItemComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('menu items', () => {

        it('should render 2 items', () => {
            component.items = [
                { title: 'menu.home', link: ['/home'] },
                { title: 'menu.about', link: ['/about'] }
            ];
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                const menuItems = fixture.debugElement.queryAll(By.css('seed-menu-item'));
                expect(menuItems.length).toBe(2);
            });
        });

    });

});
