using SimpleAts.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using SimpleAts.Domains.Users;

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
  }
}
