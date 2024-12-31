namespace API.DTOs;

public class MessageDto
{
    public int Id { get; set; }
    public required string SenderUsername { get; set; }
    public int SenderId { get; set; }
    public required string SenderPicUrl { get; set; }
    public required string ReceiverUsername { get; set; }
    public int ReceiverId { get; set; }
    public required string ReceiverPicUrl { get; set; }
    public required string Content { get; set; }
    public DateTime TimeSent { get; set; }
    public bool Read { get; set; }
}
