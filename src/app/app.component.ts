import { Component, ViewEncapsulation, HostBinding, HostListener, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AppState } from './app.service';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'maestro-app',
    templateUrl: './app.component.html',
    animations: [trigger(
        'toggleNav',
        [
            state( 'collapsed, void', style({transform: 'translateX(-100%)'}) ),
            state( 'expanded', style({transform: 'translateX(0)'}) ),
            transition( 'collapsed <=> expanded',
                [
                    animate( 200 ),
                    animate( 200 )
                ]
            )
        ]
    )],
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
       './app.style.css'
    ],
})
export class AppComponent {
    private year = new Date().getFullYear();
    private navState: string;
    constructor(private router: Router) {
        if ( window.innerWidth < 768 ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
    }

    @HostBinding('attr.id') protected get id(): string {
        return 'app';
    }

    @HostBinding('class') protected get appClass(): string {
        return 'app container-fluid';
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if ( event.target.innerWidth < 768 ) {
            this.navState = 'collapsed';
        } else {
            this.navState = 'expanded';
        }
    }

    private showNav() {
        return this.router.url === '/signin' ? false : true;
    }

    private toggleNav() {
        if ( this.navState === 'expanded' ) {
            this.navState = 'collapsed'
        } else {
            this.navState = 'expanded'
        }
    }
}
