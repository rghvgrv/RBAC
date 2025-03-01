using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SampleOAuth.DB;
using SampleOAuth.Models.DTO;
using SampleOAuth.Models.Entities;
using SampleOAuth.Services.Interfaces;

namespace SampleOAuth.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserDBContext _userDBContext;
        private readonly IJwtService _jwtService;
        private readonly IConfiguration _configuration;

        public AuthController(UserDBContext userDBContext, IJwtService jwtService, IConfiguration configuration)
        {
            _userDBContext = userDBContext;
            _jwtService = jwtService;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO userDTO)
        {
            var loginuser = await _userDBContext.Users.FirstOrDefaultAsync(x => x.Username == userDTO.Username);

            if (loginuser == null)
            {
                return Unauthorized("Invalid username");
            }

            userDTO.Password = _jwtService.HashPassword(userDTO.Password);

            if (loginuser.PasswordHash != userDTO.Password)
            {
                return Unauthorized("Invalid password");
            }

            var loginActivity = new Auth
            {
                UserId = loginuser.UserId,
                Token = "dummy",
                LoginTime = DateTime.Now,
                LogoutTime = DateTime.Now.AddMinutes(15)
            };

            var result = await _userDBContext.Auth.AddAsync(loginActivity);
            await _userDBContext.SaveChangesAsync();

            //Role of the user 
            var role = _userDBContext.Permissions.FirstOrDefault(x => x.UserId == loginuser.UserId);
            string roleType;
            if(role.RoleId == 1)
            {
                roleType = "ADMIN";
            }
            else
            {
                roleType = "USER";
            }

            var token = _jwtService.GenerateToken(loginActivity.AuthId, role.RoleId);

            loginActivity.Token = token;

            await _userDBContext.SaveChangesAsync();

            return Ok(new
            {
                Token = token,
                Message = "Login successful",
                Name = loginuser.FullName,
                Id = loginuser.UserId,
                Role = roleType
            });
        }

        [HttpPost]
        [Route("Logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
        {
            var userid = request.userId;

            if(userid == 0)
            {
                return BadRequest("Invalid user id");
            }

            var user = await _userDBContext.Auth.FirstOrDefaultAsync(x => x.UserId == userid);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            user.LogoutTime = DateTime.Now;

            await _userDBContext.SaveChangesAsync();
            return Ok("Logout successful");
        }

        [HttpGet]
        [Route("ValidateToken")]
        public async Task<IActionResult> ValidateToken()
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized("Authorization token is missing.");
            }
            var authIdClaim = _jwtService.GetUserIdFromToken(token);
            var roleIdClaim = _jwtService.GetRoleIdFromToken(token);
            if (authIdClaim == null || roleIdClaim == null)
            {
                return Unauthorized("Invalid token.");
            }

            var authId = int.Parse(authIdClaim);
            var roleId = int.Parse(roleIdClaim);


            return Ok(new
            {
                Role = roleId
            });
        }

    }
    public class LogoutRequest
    {
        public int userId { get; set; }
    }
}
