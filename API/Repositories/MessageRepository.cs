using API.Data;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Repositories;

public class MessageRepository(DataContext context, IMapper mapper) : IMessageRepository
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

    public async Task<IEnumerable<MessageDto>> GetMessageThreadAsync(
        string currentUsername,
        string receiverUsername
    )
    {
        var messages = await context
            .Messages.Include(x => x.Sender)
            .ThenInclude(x => x.Photos)
            .Include(x => x.Receiver)
            .ThenInclude(x => x.Photos)
            .Where(x =>
                (x.SenderUsername == currentUsername && x.ReceiverUsername == receiverUsername)
                || (x.SenderUsername == receiverUsername && x.ReceiverUsername == currentUsername)
            )
            .OrderBy(x => x.TimeSent)
            .ToListAsync();

        var unreadMsgs = messages
            .Where(message => !message.Read && message.ReceiverUsername == currentUsername)
            .ToList();

        if (unreadMsgs.Count != 0)
        {
            unreadMsgs.ForEach(message => message.Read = true);
            await context.SaveChangesAsync();
        }

        return mapper.Map<IEnumerable<MessageDto>>(messages);
    }

    public async Task<PagedList<MessageDto>> GetUserMessagesAsync(MessageParams messageParams)
    {
        var query = context.Messages.OrderByDescending(message => message.TimeSent).AsQueryable();

        query = messageParams.Container switch
        {
            "inbox" => query.Where(message => message.ReceiverUsername == messageParams.Username),
            "outbox" => query.Where(message => message.SenderUsername == messageParams.Username),
            _ => query.Where(message =>
                message.ReceiverUsername == messageParams.Username && !message.Read
            ),
        };

        var messagesQuery = query.ProjectTo<MessageDto>(mapper.ConfigurationProvider);
        return await PagedList<MessageDto>.GetResults(
            messagesQuery,
            messageParams.PgSize,
            messageParams.PgNumber
        );
    }

    public async Task<bool> SaveAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
