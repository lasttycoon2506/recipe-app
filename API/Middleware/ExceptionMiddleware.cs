namespace API.Middleware;

public class ExceptionMiddleware(
    RequestDelegate next,
    ILogger<ExceptionMiddleware> logger,
    IHostEnvironment env
) { 
    try {
        
    }
    catch (Exception ex) {

    }
}
