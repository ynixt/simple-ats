using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SimpleAts.Services.Extensions
{
  public static class ServiceCollectionRepositoryExtension
  {
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddSingleton<ITokenService, TokenService>();
      services.AddScoped<IAuthService, AuthService>();
      services.AddScoped<IPermissionService, PermissionService>();

      return services;
    }
  }
}
