using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;

namespace API.Services;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;

    public PhotoService(IOptions<CloudinarySettings> config)
    {
        var user = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
        _cloudinary = new Cloudinary(user);
    }

    public Task<ImageUploadResult> UploadImgAsync(IFormFile img)
    {
        throw new NotImplementedException();
    }

    public Task<DeletionResult> DeleteImgAsync(string imgId)
    {
        throw new NotImplementedException();
    }
}
