import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOutpostComponent } from './modify-outpost-dialog.component';

describe('CreateOutpostComponent', () => {
  let component: CreateOutpostComponent;
  let fixture: ComponentFixture<CreateOutpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOutpostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOutpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
