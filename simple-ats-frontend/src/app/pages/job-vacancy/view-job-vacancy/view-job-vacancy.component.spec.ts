import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobVacancyComponent } from './view-job-vacancy.component';

describe('ViewJobVacancyComponent', () => {
  let component: ViewJobVacancyComponent;
  let fixture: ComponentFixture<ViewJobVacancyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewJobVacancyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewJobVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
