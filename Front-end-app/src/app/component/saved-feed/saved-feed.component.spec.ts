import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedFeedComponent } from './saved-feed.component';

describe('SavedFeedComponent', () => {
  let component: SavedFeedComponent;
  let fixture: ComponentFixture<SavedFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
