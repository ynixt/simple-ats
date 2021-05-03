using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SimpleAts.Core.Pages
{
  public class PaginatedList<T>
  {
    public int TotalPages { get; }
    public QPage QPage { get; }
    public List<T> Items { get; }

    public bool HasNext => QPage.Page < TotalPages;

    public PaginatedList(List<T> items, int count, QPage qPage)
    {
      QPage = qPage;
      TotalPages = (int) Math.Ceiling(count / (double) QPage.PageSize);

      Items = new List<T>(items);
    }

    public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, QPage qPage)
    {
      var count = await source.CountAsync();
      var items = await source.Skip((qPage.Page - 1) * qPage.PageSize).Take(qPage.PageSize).ToListAsync();
      return new PaginatedList<T>(items, count, qPage);
    }
  }
}
