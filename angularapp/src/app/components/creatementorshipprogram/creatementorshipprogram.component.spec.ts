import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatementorshipprogramComponent } from './creatementorshipprogram.component';

describe('CreatementorshipprogramComponent', () => {
  let component: CreatementorshipprogramComponent;
  let fixture: ComponentFixture<CreatementorshipprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatementorshipprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatementorshipprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
