import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { JobVacancyRoutingModule } from './job-vacancy-routing.module';
import { NewJobVacancyComponent } from './new-job-vacancy/new-job-vacancy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewJobVacancyService } from './new-job-vacancy/new-job-vacancy.service';
import { ListJobVacancyComponent } from './list-job-vacancy/list-job-vacancy.component';
import { ListJobVacancyService } from './list-job-vacancy/list-job-vacancy.service';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { ViewJobVacancyComponent } from './view-job-vacancy/view-job-vacancy.component';
import { ViewJobVacancyService } from './view-job-vacancy/view-job-vacancy.service';
import { CandidatesComponent } from './view-job-vacancy/candidates/candidates.component';

@NgModule({
  declarations: [NewJobVacancyComponent, ListJobVacancyComponent, ViewJobVacancyComponent, CandidatesComponent],
  imports: [CommonModule, SharedModule, JobVacancyRoutingModule, ReactiveFormsModule, PoPageDynamicSearchModule],
  providers: [NewJobVacancyService, ListJobVacancyService, ViewJobVacancyService],
})
export class JobVacancyModule {}
