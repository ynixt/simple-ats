using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleAts.Domains.Jobs;
using SimpleAts.Services;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SimpleAts.Controllers
{
  [Route("jobs")]
  [Authorize]
  public class JobController : Controller
  {
    private IPermissionService permissionService;
    private IJobService jobService;

    public JobController(IPermissionService permissionService, IJobService jobService)
    {
      this.permissionService = permissionService;
      this.jobService = jobService;
    }

    [HttpPost]
    [Route("")]
    public async Task<ActionResult> NewJobVacancy([FromBody] JobVacancy jobVacancy)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

      if (await permissionService.UserHasPermission(id, "register_job_vacancy") == false)
      {
        return Unauthorized();
      }

      await jobService.NewJobVacancy(jobVacancy);

      return Ok();
    }
  }
}
