import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserappliedmentorshipprogramComponent } from './userappliedmentorshipprogram.component';

describe('UserappliedmentorshipprogramComponent', () => {
  let component: UserappliedmentorshipprogramComponent;
  let fixture: ComponentFixture<UserappliedmentorshipprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserappliedmentorshipprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserappliedmentorshipprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
