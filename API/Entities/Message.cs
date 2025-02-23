namespace API.Entities;

public class Message
{
    public int Id { get; set; }
    public required string SenderUsername { get; set; }
    public required string ReceiverUsername { get; set; }
    public required string Content { get; set; }
    public DateTime TimeSent { get; set; } = DateTime.UtcNow;
    public bool Read { get; set; }
    public int SenderId { get; set; }
    public User Sender { get; set; } = null!;
    public int ReceiverId { get; set; }
    public User Receiver { get; set; } = null!;
}
