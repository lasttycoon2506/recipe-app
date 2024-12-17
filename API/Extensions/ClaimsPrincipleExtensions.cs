using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{
    public static string GetUsername(this ClaimsPrincipal user)
    {
        var username =
            user.FindFirstValue(ClaimTypes.Name)
            ?? throw new Exception("username not found in token");

        return username;
    }

    public static string GetUserId(this ClaimsPrincipal user)
    {
        var userId =
            user.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new Exception("user-id not found in token");

        return userId;
    }
}
