namespace API.DTOs;

public class CreateMessageDto
{
    public required string ReceiverUsername { get; set; }
    public required string Content { get; set; }
}
