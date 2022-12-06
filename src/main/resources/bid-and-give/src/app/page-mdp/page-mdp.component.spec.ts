import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMdpComponent } from './page-mdp.component';

describe('PageMdpComponent', () => {
  let component: PageMdpComponent;
  let fixture: ComponentFixture<PageMdpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageMdpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
