using System;
using System.ComponentModel.DataAnnotations;

namespace SimpleAts.Core.Pages
{
  public class QPage
  {
    public int Page { get; set; } = 1;

    [Range(1, 100)] public int PageSize { get; set; } = 20;
  }
}
