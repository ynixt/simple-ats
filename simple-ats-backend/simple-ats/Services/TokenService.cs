﻿using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using SimpleAts.Domains.Users;

namespace SimpleAts.Services
{
  public class TokenService
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
      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity(new Claim[]
        {
          new(ClaimTypes.Name, user.Email),
          new(ClaimTypes.Role, user.RoleId.ToString())
        }),
        Expires = DateTime.UtcNow.AddHours(2),
        SigningCredentials =
          new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      return tokenHandler.WriteToken(token);
    }
  }
}
