using API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ServiceFilter(typeof(UserActivityLog))]
[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase { }
