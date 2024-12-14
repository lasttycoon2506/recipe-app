using System.Text.Json;
using API.Helpers;

namespace API.Extensions;

public static class HttpExtension
{
    public static void AddPaginationHeader<T>(this HttpResponse response, PagedList<T> data)
    {
        var header = new PaginationHeader(
            data.CurrentPg,
            data.PageSize,
            data.TotalItemsInDb,
            data.TotalPgs
        );

        var headerJson = JsonSerializer.Serialize(header);

        response.Headers.Append("Pagination", headerJson);
        response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
    }
}
