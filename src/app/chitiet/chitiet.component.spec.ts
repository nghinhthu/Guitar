import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietComponent } from './chitiet.component';

describe('ChitietComponent', () => {
  let component: ChitietComponent;
  let fixture: ComponentFixture<ChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
