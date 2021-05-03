using SimpleAts.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SimpleAts.Domains.Users;
using Microsoft.Data.SqlClient;

namespace SimpleAts.Repositories
{
  public class UserRepository : Repository
  {
    public UserRepository(SimpleAtsContext context) : base(context)
    {
    }

    public Task<User> GetUser(string email)
    {
      return context.Users
        .Where(user => user.Email.Equals(email))
        .FirstOrDefaultAsync();
    }

    public async Task UpdateCurriculum(int userId, string curriculum)
    {
      await context.Database.ExecuteSqlRawAsync(
        "update users set curriculum=@curriculum where id = @id",
        new SqlParameter("@id", userId), new SqlParameter("@curriculum", curriculum));
    }

    public Task<string> GetCurriculum(int userId)
    {
      return context.Users
        .Where(user => user.Id.Equals(userId))
        .Select(user => user.Curriculum)
        .FirstOrDefaultAsync();
    }
  }
}
