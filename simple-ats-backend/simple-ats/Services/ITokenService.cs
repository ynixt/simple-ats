using SimpleAts.Domains.Users;

namespace SimpleAts.Services
{
  public interface ITokenService
  {
    public string GenerateToken(User user);
  }
}
