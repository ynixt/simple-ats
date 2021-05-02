using SimpleAts.Core;
using SimpleAts.Repositories;
using SimpleAts.Rest.Dtos;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public class AuthService : IAuthService
  {
    private UserRepository userRepository;
    private ITokenService tokenService;

    public AuthService(UserRepository userRepository, ITokenService tokenService)
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
        return new UserLoginResponseDto(token);
      }

      return null;
    }
  }
}
