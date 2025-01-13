namespace API.Interfaces;

public interface IUnitOfWork
{
    ILikesRepository LikesRepository { get; }
    IMessageRepository MessageRepository { get; }
    IUserRepository UserRepository { get; }
    bool Save();
    bool HasChanges();
}
