import { Injectable } from '@angular/core';
import { HmrState } from 'angular2-hmr';

@Injectable()
export class AppState {
    // @HmrState() is used by HMR to track the state of any object during HMR (hot module replacement)
    @HmrState() _state = { };

    constructor() {

    }

    // already return a clone of the current state
    get state() {
        return this._state = this._clone(this._state);
    }
    // never allow mutation
    set state(value) {
        throw new Error('do not mutate the `.state` directly');
    }


    get(prop?: any) {
        // use our state getter for the clone
        const state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    }

    set(prop: string, value: any) {
        // internally mutate our state
        return this._state[prop] = value;
    }


    _clone(object) {
        // simple object clone
        return JSON.parse(JSON.stringify( object ));
    }
}