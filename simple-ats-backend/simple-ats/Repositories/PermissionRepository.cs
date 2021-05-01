using SimpleAts.Data;
using SimpleAts.Domains.Users;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SimpleAts.Rest.Dtos;

namespace SimpleAts.Repositories
{
  public class PermissionRepository : Repository
  {
    public PermissionRepository(SimpleAtsContext context) : base(context)
    {
    }

    public Task<List<PermissionCodeDto>> GetPermissionsCode(int userId)
    {
      return context.Users
        .Where(user => user.Id.Equals(userId))
        .SelectMany(user => user.Role.RolePermissions, (user, permission) => new PermissionCodeDto(permission.Code))
        .ToListAsync();
    }
  }
}
