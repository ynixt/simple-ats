using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using SimpleAts.Controllers;
using SimpleAts.Rest.Dtos;
using SimpleAts.Services;
using Xunit;

namespace SimpleAtsTest.Controllers
{
    public class AuthControllerTest
    {
        [Fact]
        public async void Login()
        {
            var authorization = "Basic YUBhLmM6MTIz";
            var token = "fakeToken";
            var login = "a@a.c";
            var password = "123";
            var userResponse = new UserLoginResponseDto(token);

            var httpContext = new DefaultHttpContext();
            httpContext.Request.Headers["Authorization"] = authorization;

            var mockAuthService = new Mock<IAuthService>();
            mockAuthService.Setup(m => m.Login(login, password)).ReturnsAsync(userResponse);

            var authController = new AuthController(mockAuthService.Object);

            authController.ControllerContext = new ControllerContext {HttpContext = httpContext};

            var userResponseReturned = await authController.Login();

            Assert.Equal(userResponse, userResponseReturned.Value);
        }
    }
}