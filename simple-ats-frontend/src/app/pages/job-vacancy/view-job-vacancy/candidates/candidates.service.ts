import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';
import { Page, User } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor(private apiService: ApiService) {}

  public getCandidates(jobId: number, page: number = 1): Promise<Page<User>> {
    const params: any = {
      pageSize: 3,
      page,
    };

    return this.apiService.get<Page<User>>(`/api/jobs/${jobId}/candidates`, {
      params,
    });
  }
}
