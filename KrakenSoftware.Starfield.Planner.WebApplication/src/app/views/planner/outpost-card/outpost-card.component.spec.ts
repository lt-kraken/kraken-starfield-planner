import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutpostCardComponent } from './outpost-card.component';

describe('OutpostCardComponent', () => {
  let component: OutpostCardComponent;
  let fixture: ComponentFixture<OutpostCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OutpostCardComponent]
    });
    fixture = TestBed.createComponent(OutpostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
