using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SimpleAts.Domains.Users
{
  public class Permission : DomainWithSimpleId
  {
    [Required] [MaxLength(100)] public string Code { get; set; }

    [MaxLength(255)] public string Description { get; set; }

    public IEnumerable<Role> Roles { get; set; }
  }
}
