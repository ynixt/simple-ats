import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { createComponentFactory, mockProvider, Spectator } from '@ngneat/spectator';
import { PoModule, PoNotificationService } from '@po-ui/ng-components';
import { MockComponents } from 'ng-mocks';

import { HeaderComponent } from 'src/app/shared/header/header.component';
import { MenuComponent } from 'src/app/shared/menu/menu.component';
import { TranslateService } from 'src/app/shared/translate.service';
import { NewJobVacancyComponent } from './new-job-vacancy.component';
import { NewJobVacancyService } from './new-job-vacancy.service';

describe('NewJobVacancyComponent', () => {
  let component: NewJobVacancyComponent;
  let spectator: Spectator<NewJobVacancyComponent>;

  const createComponent = createComponentFactory<NewJobVacancyComponent>({
    component: NewJobVacancyComponent,
    providers: [
      mockProvider(TranslateService),
      mockProvider(PoNotificationService),
      mockProvider(NewJobVacancyService),
      mockProvider(Router),
    ],
    declarations: [MockComponents(HeaderComponent, MenuComponent)],
    imports: [ReactiveFormsModule, PoModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('save', () => {
    it('formulário inválido', async () => {
      const name = 't';
      const description = 'b';

      component.reactiveForm.setValue({
        name,
        description,
      });

      expect(await component.save()).toBeFalse();
    });

    it('formulário válido', async () => {
      const name = 'tba';
      const description = 'beuad';

      const newJobVacancyService = spectator.inject(NewJobVacancyService);
      const poNotificationService = spectator.inject(PoNotificationService);
      const translateService = spectator.inject(TranslateService);
      const router = spectator.inject(Router);

      newJobVacancyService.save.andCallFake(async () => true);
      poNotificationService.success.and.stub();
      router.navigateByUrl.and.stub();
      translateService.translate.andCallFake(async (key: string) => key);

      component.reactiveForm.setValue({
        name,
        description,
      });

      expect(await component.save()).toBeTrue();

      expect(poNotificationService.success).toHaveBeenCalledWith('jobs.newJobVacancy.saveSuccessful');
      expect(translateService.translate).toHaveBeenCalledWith('jobs.newJobVacancy.saveSuccessful');
      expect(router.navigateByUrl).toHaveBeenCalledWith('/jobs');
    });
  });
});
