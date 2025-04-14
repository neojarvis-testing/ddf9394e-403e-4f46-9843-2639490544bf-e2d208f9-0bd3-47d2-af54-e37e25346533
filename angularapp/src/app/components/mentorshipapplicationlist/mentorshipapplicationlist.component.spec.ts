import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorshipapplicationlistComponent } from './mentorshipapplicationlist.component';

describe('MentorshipapplicationlistComponent', () => {
  let component: MentorshipapplicationlistComponent;
  let fixture: ComponentFixture<MentorshipapplicationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorshipapplicationlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorshipapplicationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
