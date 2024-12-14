using Microsoft.EntityFrameworkCore;

namespace API.Helpers;

public class PagedList<T> : List<T>
{
    public PagedList(IEnumerable<T> items, int totalItemsInDb, int pgSize, int pgNumber)
    {
        CurrentPg = pgNumber;
        TotalItemsInDb = totalItemsInDb;
        TotalPgs = (int)Math.Ceiling(totalItemsInDb / (double)pgSize);
        PageSize = pgSize;
        AddRange(items);
    }

    public int CurrentPg { get; set; }
    public int TotalPgs { get; set; }
    public int TotalItemsInDb { get; set; }
    public int PageSize { get; set; }

    public static async Task<PagedList<T>> GetResults(IQueryable<T> query, int pgSize, int pgNumber)
    {
        var totalItemsInDb = await query.CountAsync();
        var items = await query.Skip((pgNumber - 1) * pgSize).Take(pgSize).ToListAsync();
        return new PagedList<T>(items, totalItemsInDb, pgSize, pgNumber);
    }
}
