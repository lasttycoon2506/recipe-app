using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ServiceFilter(typeof(UserActivityLog))]
[ApiController]
public class BaseApiController : ControllerBase { }
