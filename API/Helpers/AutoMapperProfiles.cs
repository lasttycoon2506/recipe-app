using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<User, MemberDto>()
            .ForMember(
                to => to.PhotoUrl,
                from => from.MapFrom(from => from.Photos.FirstOrDefault(pic => pic.IsMain)!.Url)
            );
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, User>();
        CreateMap<RegisterDto, User>();
        CreateMap<Message, MessageDto>()
            .ForMember(
                to => to.SenderPicUrl,
                from =>
                    from.MapFrom(from => from.Sender.Photos.FirstOrDefault(pic => pic.IsMain)!.Url)
            )
            .ForMember(
                to => to.ReceiverPicUrl,
                from =>
                    from.MapFrom(from =>
                        from.Receiver.Photos.FirstOrDefault(pic => pic.IsMain)!.Url
                    )
            );
    }
}
