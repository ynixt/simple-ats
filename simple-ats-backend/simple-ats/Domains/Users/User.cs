using Microsoft.EntityFrameworkCore;
using SimpleAts.Domains.Jobs;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SimpleAts.Domains.Users
{
  [Index(nameof(Email), IsUnique = true)]
  public class User : DomainWithSimpleId
  {
    [Required]
    [MinLength(2)]
    [MaxLength(30)]
    public string Name { get; set; }

    [Required]
    [MinLength(5)]
    [MaxLength(50)]
    public string Email { get; set; }

    [Required]
    [MinLength(56)]
    [MaxLength(76)]
    [JsonIgnoreAttribute]
    public string Password { get; set; }

    [Required] public Role Role { get; set; }

    [Required] public int RoleId { get; set; }

    [StringLength(1000, MinimumLength = 3)]
    public string Curriculum { get; set; }

    public List<JobVacancy> VacanciesApplied { get; set; }
  }
}
