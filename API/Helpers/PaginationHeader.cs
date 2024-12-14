namespace API.Helpers;

public class PaginationHeader(int currentPg, int itemsPerPg, int totalItems, int totalPgs)
{
    public int CurrentPg { get; set; } = currentPg;
    public int ItemsPerPg { get; set; } = itemsPerPg;
    public int TotalItems { get; set; } = totalItems;
    public int TotalPgs { get; set; } = totalPgs;
}
