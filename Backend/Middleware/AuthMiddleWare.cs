using SampleOAuth.DB;
using SampleOAuth.Models.Entities;
using SampleOAuth.Services.Interfaces;

namespace SampleOAuth.Middleware
{
    public class AuthMiddleWare
    {
        private readonly RequestDelegate _next;

        public AuthMiddleWare(RequestDelegate requestDelegate)
        {
            _next = requestDelegate;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path.StartsWithSegments("/api") && !context.Request.Path.Equals("/api/auth/Login", StringComparison.OrdinalIgnoreCase) && !context.Request.Path.Equals("/api/User/Add", StringComparison.OrdinalIgnoreCase))
            {
                using (var scope = context.RequestServices.CreateScope())
                {
                    var _userDbContext = scope.ServiceProvider.GetRequiredService<UserDBContext>();
                    var _jwtService = scope.ServiceProvider.GetRequiredService<IJwtService>();
                    var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer", "");
                    if (string.IsNullOrEmpty(token))
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsync("Token is Missing");
                        return;
                    }

                    var authIdClaim = _jwtService.GetUserIdFromToken(token);
                    if (authIdClaim == null || !int.TryParse(authIdClaim, out int authid))
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsync("Invalid token.");
                        return;
                    }

                    var roleIdClaim = _jwtService.GetRoleIdFromToken(token);
                    if(roleIdClaim == null || !int.TryParse(roleIdClaim, out int roleid))
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsync("Invalid token.");
                        return;
                    }

                    var session = _userDbContext.Auth.FirstOrDefault(u => u.AuthId == authid);
                    if (session == null)
                    {
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsync("Session invalid or expired.");
                        return;
                    }

                    //validate the token 
                    if (!_jwtService.ValidateToken(token))
                    {
                        // Token expired but session is still active -> Issue a new token
                        var newToken = _jwtService.GenerateToken(authid,roleid);

                        context.Response.Headers.Add("New-Token", newToken);
                    }
                }
            }
            await _next(context);
        }
    }
}
