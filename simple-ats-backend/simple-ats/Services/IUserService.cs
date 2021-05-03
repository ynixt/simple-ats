using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public interface IUserService
  {
    public Task UpdateCurriculum(int userId, string curriculum);
    public Task<string> GetCurriculum(int userId);
  }
}
