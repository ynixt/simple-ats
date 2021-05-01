namespace SimpleAts.Rest.Dtos
{
  public class PermissionCodeDto
  {
    public PermissionCodeDto(string code)
    {
      Code = code;
    }

    public string Code { get; set; }
  }
}
