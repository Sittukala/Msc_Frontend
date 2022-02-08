import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedFeedsComponent } from './liked-feeds.component';

describe('LikedFeedsComponent', () => {
  let component: LikedFeedsComponent;
  let fixture: ComponentFixture<LikedFeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedFeedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
