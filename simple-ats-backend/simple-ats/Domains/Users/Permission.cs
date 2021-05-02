using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SimpleAts.Domains.Users
{
  [Index(nameof(Code), IsUnique = true)]
  public class Permission : DomainWithSimpleId
  {
    [Required] [MaxLength(100)] public string Code { get; set; }

    [MaxLength(255)] public string Description { get; set; }

    public IEnumerable<Role> Roles { get; set; }
  }
}
