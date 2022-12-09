import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEnchereComponent } from './card-enchere.component';

describe('CardEnchereComponent', () => {
  let component: CardEnchereComponent;
  let fixture: ComponentFixture<CardEnchereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardEnchereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardEnchereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
