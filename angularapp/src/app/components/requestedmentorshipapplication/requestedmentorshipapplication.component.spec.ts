import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedmentorshipapplicationComponent } from './requestedmentorshipapplication.component';

describe('RequestedmentorshipapplicationComponent', () => {
  let component: RequestedmentorshipapplicationComponent;
  let fixture: ComponentFixture<RequestedmentorshipapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedmentorshipapplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedmentorshipapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
