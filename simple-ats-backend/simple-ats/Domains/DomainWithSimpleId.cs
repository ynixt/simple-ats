using System.ComponentModel.DataAnnotations;

namespace SimpleAts.Domains
{
  public abstract class DomainWithSimpleId : Domain
  {
    [Key] public int Id { get; set; }
  }
}
