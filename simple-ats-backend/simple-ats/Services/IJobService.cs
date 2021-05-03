using SimpleAts.Core.Pages;
using SimpleAts.Domains.Jobs;
using SimpleAts.Domains.Users;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public interface IJobService
  {
    public Task<bool> NewJobVacancy(JobVacancy jobVacancy);

    public Task<PaginatedList<JobVacancy>> List(QPage qPage, string name = null);

    public Task<JobVacancy> GetById(int id);

    public Task<bool> IsApplied(int id, int userId);

    public Task<bool> Apply(int id, int userId);

    public Task<bool> RemoveApplication(int id, int userId);

    public Task<PaginatedList<User>> GetCandidates(int jobId, QPage qPage);
  }
}
