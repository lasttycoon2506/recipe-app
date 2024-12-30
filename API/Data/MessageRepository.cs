using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;

namespace API.Data;

public class MessageRepository : IMessageRepository
{
    public void AddMessage(Message message)
    {
        throw new NotImplementedException();
    }

    public void DeleteMessage(Message message)
    {
        throw new NotImplementedException();
    }

    public Task<Message> GetMessageAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<MessageDto>> GetMessageThreadAsync(
        string currentUsername,
        string receiverUsername
    )
    {
        throw new NotImplementedException();
    }

    public Task<PagedList<MessageDto>> GetUserMessagesAsync()
    {
        throw new NotImplementedException();
    }

    public Task<bool> SaveAsync()
    {
        throw new NotImplementedException();
    }
}
