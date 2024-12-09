using CloudinaryDotNet.Actions;

namespace API.Interfaces;

public interface IPhotoService
{
    public Task<ImageUploadResult> UploadImgAsync(IFormFile img);
    public Task<DeletionResult> DeleteImgAsync(string imgId);
}
