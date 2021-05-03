import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';
import { Curriculum } from '../core/models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  public async updateCurriculum(curriculum: string): Promise<void> {
    await this.apiService.post<void, Curriculum>('/api/user/curriculum', {
      curriculum,
    });
  }

  public async getCurriculum(userId?: number): Promise<string> {
    const params: any = {};

    if (userId != null) {
      params.userId = userId.toString();
    }

    const response = await this.apiService.get<Curriculum>('/api/user/curriculum', {
      params,
    });

    return response.curriculum;
  }
}
