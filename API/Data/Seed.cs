using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(DataContext context)
    {
        if (await context.Users.AnyAsync())
            return;
        var data = File.ReadAllText("UserSeedData.json");
        var users = JsonSerializer.Deserialize<List<User>>(data);
    }
}
