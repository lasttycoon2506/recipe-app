namespace API.Helpers;

public class UserParams
{
    private const int MaxPgSize = 50;
    public int PgNumber { get; set; } = 1;

    private int _pgSize = 20;

    public int PgSize
    {
        get => _pgSize;
        set => _pgSize = value > MaxPgSize ? MaxPgSize : value;
    }
}
