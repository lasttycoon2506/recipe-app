using API.Helpers;

namespace API.Extensions;

public static class HttpExtension
{
    public static HttpResponse HttpExt<T>(this HttpResponse response, PagedList<T> data)
    {
        var header = new PaginationHeader(
            data.CurrentPg,
            data.PageSize,
            data.TotalItemsInDb,
            data.TotalPgs
        );
    }
}
