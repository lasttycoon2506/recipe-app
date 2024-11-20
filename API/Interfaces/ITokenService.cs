using API.Entities;

namespace API.Interfaces;

public interface ITokenInterface
{
    string GetToken(User user);
}
