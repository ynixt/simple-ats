import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';

import { JobVacancy } from 'src/app/core/models';
import { TranslateService } from 'src/app/shared/translate.service';
import { NewJobVacancyService } from './new-job-vacancy.service';

@Component({
  selector: 'app-new-job-vacancy',
  templateUrl: './new-job-vacancy.component.html',
  styleUrls: ['./new-job-vacancy.component.scss'],
})
export class NewJobVacancyComponent implements OnInit {
  public reactiveForm: FormGroup;
  public showLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private newJobVacancyService: NewJobVacancyService,
    private router: Router,
    private translateService: TranslateService,
    private poNotificationService: PoNotificationService,
  ) {
    this.reactiveForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1000)])],
    });
  }

  ngOnInit(): void {}

  public async save(): Promise<boolean> {
    if (this.reactiveForm.valid) {
      const jobVacancy: JobVacancy = this.reactiveForm.value as JobVacancy;

      try {
        this.showLoading = true;
        const saved = await this.newJobVacancyService.save(jobVacancy);

        if (saved) {
          this.poNotificationService.success(await this.translateService.translate('jobs.newJobVacancy.saveSuccessful'));
          this.router.navigateByUrl('/jobs');

          return true;
        }
      } finally {
        this.showLoading = false;
      }
    }

    return false;
  }
}
