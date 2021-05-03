using SimpleAts.Core.Pages;
using SimpleAts.Domains.Jobs;
using SimpleAts.Domains.Users;
using SimpleAts.Repositories;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public class JobService : IJobService
  {
    private JobRepository jobRepository;

    public JobService(JobRepository jobRepository)
    {
      this.jobRepository = jobRepository;
    }

    public async Task<bool> NewJobVacancy(JobVacancy jobVacancy)
    {
      await jobRepository.NewJobVacancy(jobVacancy);

      return true;
    }

    public Task<PaginatedList<JobVacancy>> List(QPage qPage, string name = null)
    {
      return jobRepository.List(qPage, name);
    }

    public Task<JobVacancy> GetById(int id)
    {
      return jobRepository.GetById(id);
    }

    public Task<bool> IsApplied(int id, int userId)
    {
      return jobRepository.IsApplied(id, userId);
    }

    public async Task<bool> Apply(int id, int userId)
    {
      var isApplied = await IsApplied(id, userId);

      if (isApplied)
      {
        return false;
      }

      await jobRepository.Apply(id, userId);
      return true;
    }

    public async Task<bool> RemoveApplication(int id, int userId)
    {
      var isApplied = await IsApplied(id, userId);

      if (isApplied == false)
      {
        return false;
      }

      await jobRepository.RemoveApplication(id, userId);
      return true;
    }

    public Task<PaginatedList<User>> GetCandidates(int jobId, QPage qPage)
    {
      return jobRepository.GetCandidates(jobId, qPage);
    }
  }
}
