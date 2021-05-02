using SimpleAts.Domains.Jobs;
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
  }
}
