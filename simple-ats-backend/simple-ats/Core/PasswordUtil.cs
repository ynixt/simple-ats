namespace SimpleAts.Core
{
  public static class PasswordUtil
  {
    public static string hash(string password)
    {
      return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public static bool Verify(string password, string hash)
    {
      return BCrypt.Net.BCrypt.Verify(password, hash);
    }
  }
}
