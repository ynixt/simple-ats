using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SimpleAts.Repositories.Extensions
{
  public static class ServiceCollectionRepositoryExtension
  {
    public static IServiceCollection AddRepositories(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddScoped<UserRepository>();

      return services;
    }
  }
}
