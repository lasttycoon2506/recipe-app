using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class MessageController(
        IMessageRepository messageRepository,
        IUserRepository userRepository,
        IMapper mapper
    ) : BaseApiController
    {
        [HttpPost]
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
                Sender = sender,
                ReceiverUsername = createMessageDto.ReceiverUsername,
                Receiver = receiver,
            };

            messageRepository.AddMessage(newMessage);

            if (await messageRepository.SaveAsync())
                return Ok(mapper.Map<MessageDto>(newMessage));
            return BadRequest("unable to save message to db");
        }

        [HttpDelete("{id}")]
        public Task<ActionResult> DeleteMsg(int id)
        {
            var username = User.GetUsername();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetUserMessages(
            [FromQuery] MessageParams messageParams
        )
        {
            messageParams.Username = User.GetUsername();

            var messages = await messageRepository.GetUserMessagesAsync(messageParams);

            Response.AddPaginationHeader(messages);
            return messages;
        }

        [HttpGet("thread/{username}")]
        public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
        {
            var currentUsername = User.GetUsername();

            return Ok(await messageRepository.GetMessageThreadAsync(currentUsername, username));
        }
    }
}
