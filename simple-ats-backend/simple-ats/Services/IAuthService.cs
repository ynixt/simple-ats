using SimpleAts.Rest.Dtos;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public interface IAuthService
  {
    public Task<UserLoginResponseDto> Login(string email, string password);
  }
}
