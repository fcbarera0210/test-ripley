import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSimulationsComponent } from './list-simulations.component';

describe('ListSimulationsComponent', () => {
  let component: ListSimulationsComponent;
  let fixture: ComponentFixture<ListSimulationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSimulationsComponent]
    });
    fixture = TestBed.createComponent(ListSimulationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
