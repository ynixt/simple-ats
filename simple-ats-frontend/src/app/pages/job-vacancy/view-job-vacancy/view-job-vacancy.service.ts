import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { JobVacancy } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class ViewJobVacancyService {
  constructor(private apiService: ApiService) {}

  public async getById(id: number): Promise<JobVacancy> {
    try {
      return await this.apiService.get<JobVacancy>(`/api/jobs/${id}`);
    } catch (err) {
      if (err && err instanceof HttpErrorResponse && err.status === 404) {
        return null;
      }

      throw err;
    }
  }

  public isApplied(id: number): Promise<boolean> {
    return this.apiService.get<boolean>(`/api/jobs/${id}/apply`);
  }

  public apply(id: number): Promise<void> {
    return this.apiService.post(`/api/jobs/${id}/apply`);
  }

  public removeApplication(id: number): Promise<void> {
    return this.apiService.delete(`/api/jobs/${id}/apply`);
  }
}
