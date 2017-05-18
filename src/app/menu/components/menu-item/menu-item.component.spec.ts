import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Pipe, PipeTransform } from '@angular/core';

import { MenuItemComponent } from './menu-item.component';

@Pipe({
    name: 'translate'
})
class MockTranslatePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        return value;
    }
}

describe('MenuItemComponent', () => {
    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MenuItemComponent,
                MockTranslatePipe
            ],
            imports: [
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the text of the link to the title', () => {
        component.item = <any>{
            title: 'Home'
        };
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const linkEl = fixture.debugElement.query(By.css('a')).nativeElement;
            expect(linkEl.innerText).toBe('Home');
        });
    });

    it('should set the router link', () => {
        component.item = <any>{
            link: ['/home']
        };
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            const linkEl = fixture.debugElement.query(By.css('a')).nativeElement;
            const routerLink = linkEl.getAttribute('ng-reflect-router-link');
            expect(routerLink).toBe('/home');
        });
    });

});
