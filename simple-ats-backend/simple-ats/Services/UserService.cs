using SimpleAts.Repositories;
using System.Threading.Tasks;

namespace SimpleAts.Services
{
  public class UserService : IUserService
  {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository)
    {
      this.userRepository = userRepository;
    }

    public async Task UpdateCurriculum(int userId, string curriculum)
    {
      await userRepository.UpdateCurriculum(userId, curriculum);
    }

    public Task<string> GetCurriculum(int userId)
    {
      return userRepository.GetCurriculum(userId);
    }
  }
}
