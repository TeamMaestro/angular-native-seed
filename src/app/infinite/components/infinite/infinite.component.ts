import { Component, OnInit } from '@angular/core';
import { Observable as RxObservable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  moduleId: module.id,
  selector: 'seed-infinite',
  templateUrl: './infinite.component.html',
  styleUrls: ['./infinite.component.scss']
})
export class InfiniteComponent implements OnInit {

  items: string[] = [];
  itemIndex = 0;

  constructor() {
  }

  ngOnInit() {
    this.addItems(20);
  }

  addItems(count: number) {
    for (let i = 0; i < count; i++, this.itemIndex++) {
      this.items.push('item-' + this.itemIndex);
    }
  }
}
