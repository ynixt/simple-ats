import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) { }

  public countVacancy(): Promise<number> {
    return this.apiService.get('/api/dashboard/countVacancy');
  }

  public countCandidates(): Promise<number> {
    return this.apiService.get('/api/dashboard/countCandidates');
  }
}
