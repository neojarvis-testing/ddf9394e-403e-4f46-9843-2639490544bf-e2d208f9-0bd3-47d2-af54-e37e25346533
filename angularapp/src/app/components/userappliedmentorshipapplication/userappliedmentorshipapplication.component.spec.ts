import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserappliedmentorshipapplicationComponent } from './userappliedmentorshipapplication.component';

describe('UserappliedmentorshipapplicationComponent', () => {
  let component: UserappliedmentorshipapplicationComponent;
  let fixture: ComponentFixture<UserappliedmentorshipapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserappliedmentorshipapplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserappliedmentorshipapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
