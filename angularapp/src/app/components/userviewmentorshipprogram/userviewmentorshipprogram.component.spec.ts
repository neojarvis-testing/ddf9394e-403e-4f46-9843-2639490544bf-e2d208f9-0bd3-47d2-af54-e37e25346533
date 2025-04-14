import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewmentorshipprogramComponent } from './userviewmentorshipprogram.component';

describe('UserviewmentorshipprogramComponent', () => {
  let component: UserviewmentorshipprogramComponent;
  let fixture: ComponentFixture<UserviewmentorshipprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewmentorshipprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewmentorshipprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
