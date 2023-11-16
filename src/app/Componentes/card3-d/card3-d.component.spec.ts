import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Card3DComponent } from './card3-d.component';

describe('Card3DComponent', () => {
  let component: Card3DComponent;
  let fixture: ComponentFixture<Card3DComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Card3DComponent]
    });
    fixture = TestBed.createComponent(Card3DComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
