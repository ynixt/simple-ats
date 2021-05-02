using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleAts.Rest.Dtos;
using SimpleAts.Services;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SimpleAts.Controllers
{
  [ApiController]
  [Route("permission")]
  [Authorize]
  public class PermissionController : Controller
  {
    private IPermissionService permissionService;

    public PermissionController(IPermissionService permissionService)
    {
      this.permissionService = permissionService;
    }

    [HttpGet]
    [Route("")]
    public async Task<ActionResult<List<PermissionCodeDto>>> Get()
    {
      var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
      var permissions = await permissionService.GetPermissionsCode(id);

      return permissions;
    }
  }
}
