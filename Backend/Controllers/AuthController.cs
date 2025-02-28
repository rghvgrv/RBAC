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
                return BadRequest("Invalid username");
            }

            userDTO.Password = _jwtService.HashPassword(userDTO.Password);

            if (loginuser.PasswordHash != userDTO.Password)
            {
                return BadRequest("Invalid password");
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

            var token = _jwtService.GenerateToken(loginActivity.AuthId);

            loginActivity.Token = token;

            await _userDBContext.SaveChangesAsync();

            return Ok(new
            {
                Token = token,
                Message = "Login successful",
                Name = loginuser.FullName
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

    }
    public class LogoutRequest
    {
        public int userId { get; set; }
    }
}
