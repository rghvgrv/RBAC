using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SampleOAuth.Models.DTO;
using SampleOAuth.Repos.Interfaces;

namespace SampleOAuth.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        [Route("GetAll")]
        public IActionResult GetAll()
        {
            return Ok(_userRepository.GetUsers());
        }

        [HttpPost]
        [Route("Add")]
        public IActionResult Add([FromBody] CreateUserDTO createUserDTO)
        {
            UserDTO user = _userRepository.AddUser(createUserDTO);
            if (user == null)
            {
                return BadRequest("User not added");
            }
            return Ok("User Added Successfully");
        }

        [HttpGet]
        [Route("GetDetails/{id}")]
        public IActionResult GetDetails(int id)
        {
            return Ok(_userRepository.GetUserDetailByRole(id));
        }

        [HttpPut]
        [Route("Update/{username}")]
        public IActionResult Update([FromBody] CreateUserDTO userDTO,string username)
        {
            _userRepository.UpdateUser(userDTO,username);
            return Ok("User Updated Successfully");
        }

        [HttpGet]
        [Route("GetDetailsByUserName/{username}")]
        public IActionResult GetDetailsByUserName(string username)
        {
            return Ok(_userRepository.GetUserDetailsByUserName(username));
        }
    }
}
