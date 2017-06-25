import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTemplateComponent } from './item-template.component';

describe('ItemTemplateComponent', () => {
  let component: ItemTemplateComponent;
  let fixture: ComponentFixture<ItemTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
