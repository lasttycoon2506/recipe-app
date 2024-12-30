using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext(DbContextOptions options) : DbContext(options)
{
    public required DbSet<User> Users { get; set; }
    public required DbSet<UserLikes> Likes { get; set; }
    public required DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
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
            .OnDelete(DeleteBehavior.Cascade);

        builder
            .Entity<Message>()
            .HasOne(sender => sender.Sender)
            .WithMany(sender => sender.MessagesSent);
        builder
            .Entity<Message>()
            .HasOne(receiver => receiver.Receiver)
            .WithMany(receiver => receiver.MessagesReceived);
    }
}
