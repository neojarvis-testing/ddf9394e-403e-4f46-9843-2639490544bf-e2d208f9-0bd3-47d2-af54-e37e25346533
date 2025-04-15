import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RequestedmentorshipapplicationComponent } from './requestedmentorshipapplication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequestedmentorshipapplicationComponent', () => {
  let component: RequestedmentorshipapplicationComponent;
  let fixture: ComponentFixture<RequestedmentorshipapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ RequestedmentorshipapplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedmentorshipapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_requestedmentorshipapplication_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_mentorship_applications_for_approval_heading_in_the_requestedmentorshipapplication_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Mentorship Applications for Approval');
  });
});
