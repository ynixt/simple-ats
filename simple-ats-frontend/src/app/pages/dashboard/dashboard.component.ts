import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public countVacancy = 0;
  public countCandidates = 0;

  public showLoading: boolean;

  constructor(private dashboardService: DashboardService) {}

  public async ngOnInit(): Promise<void> {
    try {
      this.showLoading = true;
      this.countCandidates = await this.dashboardService.countCandidates();
      this.countVacancy = await this.dashboardService.countVacancy();
    } finally {
      this.showLoading = false;
    }
  }
}
