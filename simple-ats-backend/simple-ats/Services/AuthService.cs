using SimpleAts.Core;
using SimpleAts.Repositories;
using SimpleAts.Rest.Dtos;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public class AuthService
  {
    private UserRepository userRepository;
    private TokenService tokenService;

    public AuthService(UserRepository userRepository, TokenService tokenService)
    {
      this.userRepository = userRepository;
      this.tokenService = tokenService;
    }

    public async Task<UserLoginResponseDto> Login(string email, string password)
    {
      var user = await userRepository.GetUser(email);

      if (user != null && PasswordUtil.Verify(password, user.Password))
      {
        var token = tokenService.GenerateToken(user);
        return new UserLoginResponseDto(user.Id, token);
      }

      return null;
    }
  }
}
