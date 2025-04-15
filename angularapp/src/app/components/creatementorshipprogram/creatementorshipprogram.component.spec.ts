import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { CreatementorshipprogramComponent } from './creatementorshipprogram.component';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { Router } from '@angular/router';

describe('CreateMentorshipprogramComponent', () => {
  let component: CreatementorshipprogramComponent;
  let fixture: ComponentFixture<CreatementorshipprogramComponent>;
  let mentorshipService: jasmine.SpyObj<MentorshipService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const mentorshipServiceSpy = jasmine.createSpyObj('MentorshipService', ['addMentorshipprogram']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [CreatementorshipprogramComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        { provide: MentorshipService, useValue: mentorshipServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(CreatementorshipprogramComponent);
    component = fixture.componentInstance;
    mentorshipService = TestBed.inject(MentorshipService) as jasmine.SpyObj<MentorshipService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  fit('Frontend_should_create_creatementorshipprogram_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_create_new_mentorship_program_heading_in_the_creatementorshipprogram_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Create New Mentorship Program');
  });

});
