using API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Controllers;

[Route("api/[controller]")]
[ServiceFilter(typeof(UserActivityLog))]
[ApiController]
public class BaseApiController : ControllerBase { }
