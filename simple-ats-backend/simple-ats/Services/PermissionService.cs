using SimpleAts.Repositories;
using SimpleAts.Rest.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public class PermissionService : IPermissionService
  {
    private PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository)
    {
      this.permissionRepository = permissionRepository;
    }

    public Task<List<PermissionCodeDto>> GetPermissionsCode(int userId)
    {
      return permissionRepository.GetPermissionsCode(userId);
    }

    public Task<bool> UserHasPermission(int userId, string code)
    {
      return permissionRepository.UserHasPermission(userId, code);
    }
  }
}
