import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeetComponent } from './create-meet.component';

describe('CreateMeetComponent', () => {
  let component: CreateMeetComponent;
  let fixture: ComponentFixture<CreateMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
