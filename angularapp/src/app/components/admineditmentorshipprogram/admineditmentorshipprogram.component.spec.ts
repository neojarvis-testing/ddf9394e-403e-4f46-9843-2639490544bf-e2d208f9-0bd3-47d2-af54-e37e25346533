import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditmentorshipprogramComponent } from './admineditmentorshipprogram.component';

describe('AdmineditmentorshipprogramComponent', () => {
  let component: AdmineditmentorshipprogramComponent;
  let fixture: ComponentFixture<AdmineditmentorshipprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmineditmentorshipprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditmentorshipprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
