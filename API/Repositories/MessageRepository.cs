using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;

namespace API.Repositories;

public class MessageRepository(DataContext context) : IMessageRepository
{
    public void AddMessage(Message message)
    {
        context.Messages.Add(message);
    }

    public void DeleteMessage(Message message)
    {
        context.Messages.Remove(message);
    }

    public async Task<Message?> GetMessageAsync(int id)
    {
        return await context.Messages.FindAsync(id);
    }

    public Task<IEnumerable<MessageDto>> GetMessageThreadAsync(
        string currentUsername,
        string receiverUsername
    )
    {
        throw new NotImplementedException();
    }

    public Task<PagedList<MessageDto>> GetUserMessagesAsync(MessageParams messageParams)
    {
        var query = context.Messages.OrderByDescending(message => message.TimeSent).AsQueryable();
    }

    public async Task<bool> SaveAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
