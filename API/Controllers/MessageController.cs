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
                return BadRequest("cant send message to self!");

            var newMessage = new Message
            {
                Content = createMessageDto.Content,
                SenderUsername = username,
                ReceiverUsername = createMessageDto.ReceiverUsername,
            };
        }
    }
}
