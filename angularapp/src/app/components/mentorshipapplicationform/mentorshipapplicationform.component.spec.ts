import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorshipapplicationformComponent } from './mentorshipapplicationform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MentorshipapplicationformComponent', () => {
  let component: MentorshipapplicationformComponent;
  let fixture: ComponentFixture<MentorshipapplicationformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule , HttpClientTestingModule],
      declarations: [ MentorshipapplicationformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorshipapplicationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_mentorshipapplicationform_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_mentorship_application_form_heading_in_the_mentorshipapplicationform_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Mentorship Application Form');
  });
});
