import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementInputComponent } from './increment-input.component';

describe('IncrementInputComponent', () => {
  let component: IncrementInputComponent;
  let fixture: ComponentFixture<IncrementInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncrementInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncrementInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
