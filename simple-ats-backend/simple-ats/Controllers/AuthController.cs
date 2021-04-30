using Microsoft.AspNetCore.Mvc;
using SimpleAts.Rest.Dtos;
using SimpleAts.Services;
using System.Threading.Tasks;

namespace SimpleAts.Controllers
{
  [ApiController]
  [Route("auth")]
  public class AuthController : Controller
  {
    private AuthService authService;

    public AuthController(AuthService authService)
    {
      this.authService = authService;
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult<dynamic>> Login([FromBody] UserLoginRequestDto dto)
    {
      var user = await authService.Login(dto.Email, dto.Password);

      if (user == null)
      {
        return Unauthorized();
      }

      return user;
    }
  }
}
