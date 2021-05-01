using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SimpleAts.Services;

namespace SimpleAts.Services.Extensions
{
  public static class ServiceCollectionRepositoryExtension
  {
    public static IServiceCollection AddServices(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddSingleton<TokenService>();
      services.AddScoped<AuthService>();
      services.AddScoped<PermissionService>();

      return services;
    }
  }
}
