
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AdmineditmentorshipprogramComponent } from './admineditmentorshipprogram.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('AdmineditmentorshipprogramComponent', () => {
  let component: AdmineditmentorshipprogramComponent;
  let fixture: ComponentFixture<AdmineditmentorshipprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule , HttpClientTestingModule , FormsModule],
      declarations: [ AdmineditmentorshipprogramComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),
            snapshot: {
              paramMap: {
                get: () => '123',  
              },
            },
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineditmentorshipprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_admineditmentorshipprogram_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_edit_mentorship_program_heading_in_the_admineditmentorshipprogram_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Edit Mentorship Program');
  }); 

});
