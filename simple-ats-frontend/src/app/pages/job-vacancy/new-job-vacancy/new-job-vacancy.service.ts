import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { JobVacancy } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class NewJobVacancyService {
  constructor(private apiService: ApiService) {}

  public async save(jobVacancy: JobVacancy): Promise<boolean> {
    try {
      await this.apiService.post<JobVacancy, JobVacancy>('/api/jobs', jobVacancy);
      return true;
    } catch (err) {
      return false;
    }
  }
}
