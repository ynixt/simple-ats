using SimpleAts.Data;
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

    public async Task<bool> UserHasPermission(int userId, string code)
    {
      return await context.Users
        .Where(user =>
          user.Id.Equals(userId) && user.Role.RolePermissions.Any(permission => permission.Code.Equals(code)))
        .CountAsync() > 0;
    }
  }
}
