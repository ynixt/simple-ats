import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListJobVacancyComponent } from './list-job-vacancy/list-job-vacancy.component';
import { NewJobVacancyComponent } from './new-job-vacancy/new-job-vacancy.component';
import { ViewJobVacancyComponent } from './view-job-vacancy/view-job-vacancy.component';

const routes: Routes = [
  {
    path: '',
    component: ListJobVacancyComponent,
  },
  {
    path: 'new',
    component: NewJobVacancyComponent,
  },
  {
    path: ':id',
    component: ViewJobVacancyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobVacancyRoutingModule {}
