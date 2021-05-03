using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public interface IDashboardService
  {
    public Task<int> CountVacancy();

    public Task<int> CountCandidates();
  }
}
