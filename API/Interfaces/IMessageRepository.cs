using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IMessageRepository
{
    void AddMessage(Message message);
    void DeleteMessage(Message message);
    Task<Message> GetMessageAsync(int id);
    Task<PagedList<MessageDto>> GetUserMessagesAsync();
    Task<IEnumerable<MessageDto>> GetMessageThreadAsync(
        string senderUsername,
        string receiverUsername
    );
    Task<bool> SaveAsync();
}
