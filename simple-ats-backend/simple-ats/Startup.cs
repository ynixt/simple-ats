using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using SimpleAts.Data.Extensions;
using SimpleAts.Services.Extensions;
using SimpleAts.Core.Extensions;
using Microsoft.AspNetCore.Http;
using SimpleAts.Repositories.Extensions;

namespace SimpleAts
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddControllers();
      services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo {Title = "SimpleAts", Version = "v1"}); });

      services.AddPersistence(Configuration);
      services.AddServices(Configuration);
      services.AddRepositories(Configuration);
      services.AddAuth(Configuration);

      services.AddDatabaseDeveloperPageExceptionFilter();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SimpleAts v1"));
      }

      app.UseHttpsRedirection();

      app.UsePathBase(new PathString("/api"));
      app.UseRouting();


      app.UseAuthentication();
      app.UseAuthorization();

      app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
    }
  }
}
