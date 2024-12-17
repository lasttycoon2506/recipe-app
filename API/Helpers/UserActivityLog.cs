using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers;

public class UserActivityLog : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next
    )
    {
        var result = await next();
        if (context.HttpContext.User.Identity!.IsAuthenticated != true)
            return;

        var userId = result.HttpContext.User.GetUserId();

        var repo = result.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
        var user = await repo.GetUserByIdAsync(userId);
        if (user == null)
            return;
        user.LastActive = DateTime.UtcNow;
        await repo.SaveAsync();
    }
}
