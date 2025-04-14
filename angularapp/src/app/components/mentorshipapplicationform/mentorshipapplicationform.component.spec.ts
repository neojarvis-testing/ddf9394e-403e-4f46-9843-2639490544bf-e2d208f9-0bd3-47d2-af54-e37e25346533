import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorshipapplicationformComponent } from './mentorshipapplicationform.component';

describe('MentorshipapplicationformComponent', () => {
  let component: MentorshipapplicationformComponent;
  let fixture: ComponentFixture<MentorshipapplicationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorshipapplicationformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorshipapplicationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
