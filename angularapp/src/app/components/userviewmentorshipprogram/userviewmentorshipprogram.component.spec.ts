import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewmentorshipprogramComponent } from './userviewmentorshipprogram.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserviewmentorshipprogramComponent', () => {
  let component: UserviewmentorshipprogramComponent;
  let fixture: ComponentFixture<UserviewmentorshipprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ UserviewmentorshipprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewmentorshipprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_userviewmentorshipprogram_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_available_mentorship_programs_heading_in_the_userviewmentorshipprogram_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Available Mentorship Programs');
  });
});
