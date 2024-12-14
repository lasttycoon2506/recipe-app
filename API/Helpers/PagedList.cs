namespace API.Helpers;

public class PagedList<T> : List<T>
{
    public PagedList(IEnumerable<T> items, int count, int pgSize, int pgNumber)
    {
        currentPg = pgNumber;
        totalCount = count;
        pgs = (int)Math.Ceiling((double)count / pgSize);
    }

    public int currentPg { get; set; }
    public int pgs { get; set; }
    public int totalCount { get; set; }
}
