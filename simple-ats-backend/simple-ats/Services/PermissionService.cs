﻿using SimpleAts.Repositories;
using SimpleAts.Rest.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public class PermissionService
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
  }
}
