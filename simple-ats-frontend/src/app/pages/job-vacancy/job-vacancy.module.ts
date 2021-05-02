import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { JobVacancyRoutingModule } from './job-vacancy-routing.module';
import { NewJobVacancyComponent } from './new-job-vacancy/new-job-vacancy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewJobVacancyService } from './new-job-vacancy/new-job-vacancy.service';

@NgModule({
  declarations: [NewJobVacancyComponent],
  imports: [CommonModule, SharedModule, JobVacancyRoutingModule, ReactiveFormsModule],
  providers: [NewJobVacancyService],
})
export class JobVacancyModule {}
