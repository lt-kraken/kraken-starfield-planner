import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOutpostDialogComponent } from './delete-outpost-dialog.component';

describe('DeleteOutpostDialogComponent', () => {
  let component: DeleteOutpostDialogComponent;
  let fixture: ComponentFixture<DeleteOutpostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOutpostDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteOutpostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
