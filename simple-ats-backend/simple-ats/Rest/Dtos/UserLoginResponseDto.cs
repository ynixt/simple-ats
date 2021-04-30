namespace SimpleAts.Rest.Dtos
{
  public class UserLoginResponseDto
  {
    public UserLoginResponseDto(int userId, string token)
    {
      UserId = userId;
      Token = token;
    }

    public int UserId { get; set; }
    public string Token { get; set; }
  }
}
