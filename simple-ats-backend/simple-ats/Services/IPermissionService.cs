using SimpleAts.Rest.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public interface IPermissionService
  {
    public Task<List<PermissionCodeDto>> GetPermissionsCode(int userId);

    public Task<bool> UserHasPermission(int userId, string code);
  }
}
