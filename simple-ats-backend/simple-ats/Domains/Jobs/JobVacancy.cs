using SimpleAts.Domains.Users;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SimpleAts.Domains.Jobs
{
  public class JobVacancy : DomainWithSimpleId
  {
    [Required]
    [StringLength(100, MinimumLength = 3)]
    [MaxLength(100)]
    public string Name { get; set; }

    [Required]
    [StringLength(1000, MinimumLength = 5)]
    [MaxLength(1000)]
    public string Description { get; set; }

    public List<User> Candidates { get; set; }
  }
}
