using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SimpleAts.Rest.Dtos;
using SimpleAts.Services;
using System;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace SimpleAts.Controllers
{
  [ApiController]
  [Route("auth")]
  [Authorize]
  public class AuthController : Controller
  {
    private IAuthService authService;

    public AuthController(IAuthService authService)
    {
      this.authService = authService;
    }

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public async Task<ActionResult<UserLoginResponseDto>> Login()
    {
      try
      {
        var authHeader = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
        var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
        var credentials = Encoding.UTF8.GetString(credentialBytes).Split(new[] {':'}, 2);
        var email = credentials[0];
        var password = credentials[1];

        var user = await authService.Login(email, password);

        if (user != null)
        {
          return user;
        }
      }
      catch
      {
      }

      return Unauthorized();
    }


    [HttpGet]
    [Route("isLogged")]
    public ActionResult IsLogged()
    {
      return Ok();
    }
  }
}
