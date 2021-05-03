using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleAts.Core.Pages;
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

    [HttpGet]
    [Route("")]
    public async Task<ActionResult<PaginatedList<JobVacancy>>> List([FromQuery] QPage qPage,
      [FromQuery] string name = null)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      return Ok(await jobService.List(qPage, name));
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<JobVacancy>> GetById(int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var job = await jobService.GetById(id);

      if (job != null)
      {
        return Ok(job);
      }
      else
      {
        return NotFound();
      }
    }

    [HttpGet]
    [Route("{id}/apply")]
    public async Task<ActionResult<bool>> IsApplied(int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

      var isApplied = await jobService.IsApplied(id, userId);

      return Ok(isApplied);
    }

    [HttpPost]
    [Route("{id}/apply")]
    public async Task<ActionResult> Apply(int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
      var appliedSuccessful = await jobService.Apply(id, userId);

      if (appliedSuccessful)
      {
        return Ok();
      }
      else
      {
        return BadRequest("jobs.viewJobVacancy.alreadyApply");
      }
    }

    [HttpDelete]
    [Route("{id}/apply")]
    public async Task<ActionResult> RemoveApplication(int id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
      var removedSuccessful = await jobService.RemoveApplication(id, userId);

      if (removedSuccessful)
      {
        return Ok();
      }
      else
      {
        return BadRequest("jobs.viewJobVacancy.removeApplicationError");
      }
    }
  }
}
