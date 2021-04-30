using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace SimpleAts.Data.Extensions
{
  public static class ServiceCollectionDataExtension
  {
    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
    {
      services.AddDbContext<SimpleAtsContext>(optionsBuilder =>
      {
        if (!optionsBuilder.IsConfigured)
        {
          var connectionString = configuration.GetConnectionString("DefaultConnection");
          optionsBuilder.UseSqlServer(connectionString);
          optionsBuilder.EnableSensitiveDataLogging();
          optionsBuilder.UseSnakeCaseNamingConvention();
        }
      });

      return services;
    }
  }
}
