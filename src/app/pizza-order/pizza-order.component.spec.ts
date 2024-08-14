import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaOrderComponent } from './pizza-order.component';

describe('PizzaOrderComponent', () => {
  let component: PizzaOrderComponent;
  let fixture: ComponentFixture<PizzaOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PizzaOrderComponent]
    });
    fixture = TestBed.createComponent(PizzaOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
