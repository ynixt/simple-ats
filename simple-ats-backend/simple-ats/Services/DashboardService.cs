using SimpleAts.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public class DashboardService : IDashboardService
  {
    private DashboardRepository dashboardRepository;

    public DashboardService(DashboardRepository dashboardRepository)
    {
      this.dashboardRepository = dashboardRepository;
    }

    public Task<int> CountVacancy()
    {
      return dashboardRepository.CountVacancy();
    }

    public Task<int> CountCandidates()
    {
      return dashboardRepository.CountCandidates();
    }
  }
}
