import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEncherirComponent } from './page-encherir.component';

describe('PageEncherirComponent', () => {
  let component: PageEncherirComponent;
  let fixture: ComponentFixture<PageEncherirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageEncherirComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEncherirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
