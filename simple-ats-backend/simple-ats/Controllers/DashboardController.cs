using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleAts.Services;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SimpleAts.Controllers
{
  [ApiController]
  [Route("dashboard")]
  [Authorize]
  public class DashboardController : Controller
  {
    private IDashboardService dashboardService;
    private IPermissionService permissionService;

    public DashboardController(IDashboardService dashboardService, IPermissionService permissionService)
    {
      this.dashboardService = dashboardService;
      this.permissionService = permissionService;
    }

    [HttpGet]
    [Route("countVacancy")]
    public async Task<ActionResult<int>> CountVacancy()
    {
      var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

      if (await permissionService.UserHasPermission(userId, "view_dashboard") == false)
      {
        return Unauthorized();
      }

      return await dashboardService.CountVacancy();
    }

    [HttpGet]
    [Route("countCandidates")]
    public async Task<ActionResult<int>> CountCandidates()
    {
      var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

      if (await permissionService.UserHasPermission(userId, "view_dashboard") == false)
      {
        return Unauthorized();
      }

      return await dashboardService.CountCandidates();
    }
  }
}
