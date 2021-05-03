import { Router } from '@angular/router';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { TranslateService } from 'src/app/shared/translate.service';

import { ListJobVacancyComponent } from './list-job-vacancy.component';
import { ListJobVacancyService } from './list-job-vacancy.service';

describe('ListJobVacancyComponent', () => {
  let component: ListJobVacancyComponent;
  let spectator: Spectator<ListJobVacancyComponent>;

  const createComponent = createComponentFactory<ListJobVacancyComponent>({
    component: ListJobVacancyComponent,
    providers: [mockProvider(ListJobVacancyService), mockProvider(TranslateService), mockProvider(Router)],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
