import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFavorisComponent } from './page-favoris.component';

describe('PageFavorisComponent', () => {
  let component: PageFavorisComponent;
  let fixture: ComponentFixture<PageFavorisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageFavorisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFavorisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
