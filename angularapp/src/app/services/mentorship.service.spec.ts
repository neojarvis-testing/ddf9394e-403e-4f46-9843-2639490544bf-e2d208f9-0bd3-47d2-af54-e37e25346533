
import { TestBed } from '@angular/core/testing';

import { MentorshipService } from './mentorship.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MentorshipService', () => {
  let service: MentorshipService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MentorshipService);
  });

  fit('Frontend_should_create_mentorship_service', () => {
    expect(service).toBeTruthy();
  });
});
