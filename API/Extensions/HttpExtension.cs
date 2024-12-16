using System.Text.Json;
using API.Helpers;
using Newtonsoft.Json.Serialization;

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
        var jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        };
        var headerJson = JsonSerializer.Serialize(header, jsonOptions);

        response.Headers.Append("Pagination", headerJson);
        response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
    }
}
