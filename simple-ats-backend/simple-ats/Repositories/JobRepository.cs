using SimpleAts.Data;
using SimpleAts.Domains.Jobs;
using System.Threading.Tasks;

namespace SimpleAts.Repositories
{
  public class JobRepository : Repository
  {
    public JobRepository(SimpleAtsContext context) : base(context)
    {
    }

    public Task<int> NewJobVacancy(JobVacancy jobVacancy)
    {
      context.Add(jobVacancy);
      return context.SaveChangesAsync();
    }
  }
}
