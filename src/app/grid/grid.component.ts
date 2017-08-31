import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { products } from './products';

@Component({
  moduleId: module.id,
  selector: 'seed-grid',
  templateUrl: './grid.component.html',
  //styleUrls: ['../../../node_modules/@progress/kendo-theme-default/dist/all.css'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {

  private gridData: any[] = products;

  constructor() { }

  ngOnInit() {
  }

}
