import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserappliedmentorshipapplicationComponent } from './userappliedmentorshipapplication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserappliedmentorshipapplicationComponent', () => {
  let component: UserappliedmentorshipapplicationComponent;
  let fixture: ComponentFixture<UserappliedmentorshipapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ UserappliedmentorshipapplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserappliedmentorshipapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_userappliedmentorshipapplication_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_applied_mentorships_heading_in_the_userappliedmentorshipapplication_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Applied Mentorships');
  });
});
