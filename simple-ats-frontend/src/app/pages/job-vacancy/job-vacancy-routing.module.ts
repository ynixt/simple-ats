import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewJobVacancyComponent } from './new-job-vacancy/new-job-vacancy.component';

const routes: Routes = [
  {
    path: 'new',
    component: NewJobVacancyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobVacancyRoutingModule {}
