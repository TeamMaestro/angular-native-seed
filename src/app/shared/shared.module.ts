import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
export { RouterModule } from '@angular/router';


@NgModule({
  imports: [ CommonModule ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule {

};
