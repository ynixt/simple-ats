﻿using Microsoft.EntityFrameworkCore;
using SimpleAts.Domains.Jobs;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
    public string Password { get; set; }

    [Required] public Role Role { get; set; }

    [Required] public int RoleId { get; set; }

    public List<JobVacancy> VacanciesApplied { get; set; }
  }
}
