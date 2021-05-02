using Microsoft.EntityFrameworkCore;
using SimpleAts.Domains.Jobs;
using SimpleAts.Domains.Users;

namespace SimpleAts.Data
{
  public class SimpleAtsContext : DbContext
  {
    public SimpleAtsContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Permission> Permissions { get; set; }
    public DbSet<JobVacancy> JobVacancies { get; set; }
  }
}
