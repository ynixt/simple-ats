using SimpleAts.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace SimpleAts.Repositories
{
  public class DashboardRepository : Repository
  {
    public DashboardRepository(SimpleAtsContext context) : base(context)
    {
    }

    public Task<int> CountVacancy()
    {
      return context.JobVacancies
        .CountAsync();
    }

    public Task<int> CountCandidates()
    {
      return context.JobVacancies
        .SelectMany(job => job.Candidates)
        .CountAsync();
    }
  }
}
