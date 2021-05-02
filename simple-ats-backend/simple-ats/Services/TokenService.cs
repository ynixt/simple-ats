using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using SimpleAts.Domains.Users;

namespace SimpleAts.Services
{
  public class TokenService : ITokenService
  {
    private IConfiguration configuration;

    public TokenService(IConfiguration configuration)
    {
      this.configuration = configuration;
    }

    public string GenerateToken(User user)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes(configuration.GetValue<string>("secret"));
      var expirationDateTime = DateTime.UtcNow.AddHours(2);

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
        {
          new(ClaimTypes.NameIdentifier, user.Id.ToString()),
          new(ClaimTypes.Name, user.Email),
          new(ClaimTypes.GivenName, user.Name)
        }),
        Expires = expirationDateTime,
        SigningCredentials =
          new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
  }
}
