import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickingOrderComponent } from './picking-order.component';

describe('PickingOrderComponent', () => {
  let component: PickingOrderComponent;
  let fixture: ComponentFixture<PickingOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PickingOrderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
