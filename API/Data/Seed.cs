using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(
        UserManager<User> userManager,
        RoleManager<AppRole> roleManager
    )
    {
        if (await userManager.Users.AnyAsync())
            return;
        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
        var users = JsonSerializer.Deserialize<List<User>>(userData, options);

        if (users == null)
            return;

        var roles = new List<AppRole>
        {
            new() { Name = "Admin" },
            new() { Name = "Member" },
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        foreach (var user in users)
        {
            await userManager.CreateAsync(user, "Pa$sw0rd");
            await userManager.AddToRoleAsync(user, "Member");
        }

        var admin = new User { UserName = "admin" };

        await userManager.CreateAsync(admin, "Pa$sw0rd");
        await userManager.AddToRoleAsync(admin, "Admin");
    }
}
