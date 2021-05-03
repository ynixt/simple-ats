import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Page, JobVacancy, QPage } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class ListJobVacancyService {
  constructor(private apiService: ApiService) {}

  public list(args?: { qPage?: QPage; name?: string }): Promise<Page<JobVacancy>> {
    const params: any = {};

    if (args) {
      if (args.qPage) {
        if (args.qPage.page) {
          params.page = args.qPage.page;
        }

        if (args.qPage.pageSize) {
          params.pageSize = args.qPage.pageSize;
        }
      }

      if (args.name != null) {
        params.name = args.name;
      }
    }

    return this.apiService.get<Page<JobVacancy>>('/api/jobs', { params });
  }
}
