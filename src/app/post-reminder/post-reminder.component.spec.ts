import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReminderComponent } from './post-reminder.component';

describe('PostReminderComponent', () => {
  let component: PostReminderComponent;
  let fixture: ComponentFixture<PostReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostReminderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
