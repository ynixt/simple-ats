using SimpleAts.Core.Pages;
using SimpleAts.Data;
using SimpleAts.Domains.Jobs;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;

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

    public Task<PaginatedList<JobVacancy>> List(QPage qPage, string name = null)
    {
      IQueryable<JobVacancy> jobVacancies = context.JobVacancies;

      if (string.IsNullOrEmpty(name) == false)
      {
        jobVacancies = jobVacancies.Where(jv => jv.Name.StartsWith(name));
      }

      return PaginatedList<JobVacancy>.CreateAsync(jobVacancies, qPage);
    }

    public Task<JobVacancy> GetById(int id)
    {
      return context.JobVacancies.Where(job => job.Id.Equals(id)).FirstOrDefaultAsync();
    }

    public async Task<bool> IsApplied(int id, int userId)
    {
      return await context.JobVacancies
        .Where(job => job.Id.Equals(id) && job.Candidates.Any(user => user.Id.Equals(userId)))
        .CountAsync() > 0;
    }

    public async Task Apply(int id, int userId)
    {
      await context.Database.ExecuteSqlRawAsync(
        "insert into job_vacancy_user (candidates_id, vacancies_applied_id) values (@userId, @id)",
        new SqlParameter("@userId", userId), new SqlParameter("@id", id));
    }

    public async Task RemoveApplication(int id, int userId)
    {
      await context.Database.ExecuteSqlRawAsync(
        "delete from job_vacancy_user where candidates_id = @userId and vacancies_applied_id = @id",
        new SqlParameter("@userId", userId), new SqlParameter("@id", id));
    }
  }
}
