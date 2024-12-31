using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessageController(
        IMessageRepository messageRepository,
        IUserRepository userRepository,
        IMapper mapper
    ) : BaseApiController
    {
        [HttpPost("send-message")]
        public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
        {
            var username = User.GetUsername();
            if (username == createMessageDto.ReceiverUsername)
                return BadRequest("cant message self!");

            var sender = await userRepository.GetUserAsync(username);
            var receiver = await userRepository.GetUserAsync(createMessageDto.ReceiverUsername);
            if (sender == null || receiver == null)
                return NotFound("sender or receiver not found");

            var newMessage = new Message
            {
                Content = createMessageDto.Content,
                SenderUsername = username,
                SenderId = sender.Id,
                ReceiverUsername = createMessageDto.ReceiverUsername,
                ReceiverId = receiver.Id,
            };

            messageRepository.AddMessage(newMessage);
            return mapper.Map<MessageDto>(newMessage);
        }
    }
}
