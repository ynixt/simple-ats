using SimpleAts.Domains.Jobs;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public interface IJobService
  {
    public Task<bool> NewJobVacancy(JobVacancy jobVacancy);
  }
}
