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

        var repo = result.HttpContext.RequestServices.GetRequiredService<IUserRepository>();
        var username = result.HttpContext.User.GetUsername();
        var member = await repo.GetMemberAsync(username);
        if (member != null)
        {
            member.LastActive = DateTime.UtcNow;
        }
        await repo.SaveAsync();
    }
}
