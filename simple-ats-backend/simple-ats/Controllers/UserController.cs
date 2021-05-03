using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleAts.Rest.Dtos;
using SimpleAts.Services;

namespace SimpleAtsTest.Controllers
{
  [ApiController]
  [Route("user")]
  [Authorize]
  public class UserController : Controller
  {
    private IUserService userService;

    public UserController(IUserService userService)
    {
      this.userService = userService;
    }

    [HttpPost]
    [Route("curriculum")]
    public async Task<ActionResult> UpdateCurriculum([FromBody] CurriculumDto dto)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
      await userService.UpdateCurriculum(userId, dto.Curriculum);
      return Ok();
    }

    [HttpGet]
    [Route("curriculum")]
    public async Task<ActionResult<CurriculumDto>> GetCurriculum([FromQuery] int? userId = null)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      userId ??= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
      return Ok(new CurriculumDto() {Curriculum = await userService.GetCurriculum((int) userId)});
    }
  }
}
