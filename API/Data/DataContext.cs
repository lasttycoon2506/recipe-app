using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options)
    : IdentityDbContext<
        User,
        AppRole,
        int,
        IdentityUserClaim<int>,
        UserRole,
        IdentityUserLogin<int>,
        IdentityRoleClaim<int>,
        IdentityUserToken<int>
    >(options)
{
    public required DbSet<UserLikes> Likes { get; set; }
    public required DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder
            .Entity<User>()
            .HasMany(prop => prop.UserRoles)
            .WithOne(prop => prop.User)
            .HasForeignKey(x => x.UserId)
            .IsRequired();

        builder
            .Entity<AppRole>()
            .HasMany(prop => prop.UserRoles)
            .WithOne(prop => prop.Role)
            .HasForeignKey(x => x.RoleId)
            .IsRequired();

        builder.Entity<UserLikes>().HasKey(key => new { key.SourceUserId, key.TargetUserId });

        builder
            .Entity<UserLikes>()
            .HasOne(source => source.SourceUser)
            .WithMany(target => target.WhoUserLikes)
            .HasForeignKey(source => source.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);
        builder
            .Entity<UserLikes>()
            .HasOne(source => source.TargetUser)
            .WithMany(target => target.WhoLikesUser)
            .HasForeignKey(source => source.TargetUserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .Entity<Message>()
            .HasOne(sender => sender.Sender)
            .WithMany(sender => sender.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);
        builder
            .Entity<Message>()
            .HasOne(receiver => receiver.Receiver)
            .WithMany(receiver => receiver.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
