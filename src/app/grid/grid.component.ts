import { Component, OnInit } from '@angular/core';
import { products } from './products';

@Component({
  moduleId: module.id,
  selector: 'seed-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  private gridData: any[] = products;

  constructor() { }

  ngOnInit() {
  }

}
