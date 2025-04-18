import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserwishlistcomponentComponent } from './userwishlistcomponent.component';

describe('UserwishlistcomponentComponent', () => {
  let component: UserwishlistcomponentComponent;
  let fixture: ComponentFixture<UserwishlistcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserwishlistcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserwishlistcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
