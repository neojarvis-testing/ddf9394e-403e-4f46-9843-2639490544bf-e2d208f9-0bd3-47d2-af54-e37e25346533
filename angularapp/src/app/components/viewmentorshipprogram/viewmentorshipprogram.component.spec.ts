import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewmentorshipprogramComponent } from './viewmentorshipprogram.component';

describe('ViewmentorshipprogramComponent', () => {
  let component: ViewmentorshipprogramComponent;
  let fixture: ComponentFixture<ViewmentorshipprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewmentorshipprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmentorshipprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
