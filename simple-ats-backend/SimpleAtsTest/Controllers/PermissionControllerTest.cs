using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SimpleAts.Controllers;
using SimpleAts.Rest.Dtos;
using SimpleAts.Services;
using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using Xunit;

namespace SimpleAtsTest.Controllers
{
  public class PermissionControllerTest
  {
    [Fact]
    public async void Login()
    {
      var permissions = new List<PermissionCodeDto>()
      {
        new("test")
      };

      var id = 199;

      var mockPermissionService = new Mock<IPermissionService>();
      mockPermissionService.Setup(m => m.GetPermissionsCode(id)).ReturnsAsync(permissions);

      var claims = new List<Claim>()
      {
        new(ClaimTypes.NameIdentifier, id.ToString())
      };

      var identity = new ClaimsIdentity(claims, "TestAuthType");
      var claimsPrincipal = new ClaimsPrincipal(identity);

      var mockPrincipal = new Mock<IPrincipal>();
      mockPrincipal.Setup(x => x.Identity).Returns(identity);
      mockPrincipal.Setup(x => x.IsInRole(It.IsAny<string>())).Returns(true);

      var mockHttpContext = new Mock<HttpContext>();
      mockHttpContext.Setup(m => m.User).Returns(claimsPrincipal);

      var mockControllerContext = new Mock<ControllerContext>();

      var permissionController = new PermissionController(mockPermissionService.Object);

      permissionController.ControllerContext = new ControllerContext {HttpContext = mockHttpContext.Object};

      var permissionsReturned = await permissionController.Get();

      Assert.Equal(permissions, permissionsReturned.Value);
    }
  }
}
