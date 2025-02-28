using SampleOAuth.DB;
using SampleOAuth.Models.DTO;
using SampleOAuth.Models.Entities;
using SampleOAuth.Repos.Interfaces;
using SampleOAuth.Services.Interfaces;

namespace SampleOAuth.Repos
{
    public class UserRepository : IUserRepository
    {
        public readonly UserDBContext _context;
        public readonly IJwtService _jwtService;

        public UserRepository(UserDBContext context, IJwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }
        public List<UserDTO> GetUsers()
        {
            var users = _context.Users.Select(u => new UserDTO(u.Username, u.FullName)).ToList();
            return users;
        }
        public UserDTO AddUser(CreateUserDTO createUserDTO)
        {
            createUserDTO.Password = _jwtService.HashPassword(createUserDTO.Password);
            var user = new User
            {
                Username = createUserDTO.Username,
                FullName = createUserDTO.FullName,
                PasswordHash = createUserDTO.Password
            };
            _context.Users.Add(user);
            _context.SaveChanges();
            return new UserDTO(user.Username, user.FullName);
        }
        public List<UserDTO> GetUserDetailByRole(int userId)
        {
            var roleid = _context.Permissions.Where(p => p.UserId == userId).Select(p => p.RoleId).FirstOrDefault();

            if (roleid == 1)
            {
                var users = _context.Users.Select(u => new UserDTO(u.Username, u.FullName)).ToList();
                return users;
            }
            else
            {
                var users = _context.Users.Where(u => u.UserId == userId).Select(u => new UserDTO(u.Username, u.FullName)).ToList();
                return users;
            }
        }
    }
}
