import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewmentorshipprogramComponent } from './viewmentorshipprogram.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewmentorshipprogramComponent', () => {
  let component: ViewmentorshipprogramComponent;
  let fixture: ComponentFixture<ViewmentorshipprogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ ViewmentorshipprogramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewmentorshipprogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('Frontend_should_create_viewmentorshipprogram_component', () => {
    expect(component).toBeTruthy();
  });

  fit('Frontend_should_contain_Mentorship_Program_Listings_heading_in_the_viewmentorshipprogram_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('Mentorship Program Listings');
  });
});
