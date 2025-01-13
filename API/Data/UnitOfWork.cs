using API.Interfaces;

namespace API.Data;

public class UnitOfWork(
    DataContext context,
    ILikesRepository likesRepository,
    IMessageRepository messageRepository,
    IUserRepository userRepository
) : IUnitOfWork
{
    public ILikesRepository LikesRepository => likesRepository;

    public IMessageRepository MessageRepository => messageRepository;

    public IUserRepository UserRepository => userRepository;

    public bool HasChanges()
    {
        return context.ChangeTracker.HasChanges();
    }

    public async Task<bool> Save()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
