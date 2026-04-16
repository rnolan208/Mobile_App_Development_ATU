import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentlyViewedPage } from './recently-viewed.page';

describe('RecentlyViewedPage', () => {
  let component: RecentlyViewedPage;
  let fixture: ComponentFixture<RecentlyViewedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyViewedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
