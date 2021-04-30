using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SimpleAts.Domains.Users
{
  public class Role : DomainWithSimpleId
  {
    [Required] [MaxLength(15)] public string Name { get; set; }

    public IEnumerable<Permission> RolePermissions { get; set; }
  }
}
