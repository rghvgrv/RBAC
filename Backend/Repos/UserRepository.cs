using Microsoft.AspNetCore.Http.HttpResults;
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
        private readonly int ADMIN = 1;
        private readonly int USER = 2;

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

            var defaultPermission = new Permission
            {
                UserId = user.UserId,
                RoleId = USER,
                AssignedAt = DateTime.Now,
            };

            _context.Permissions.Add(defaultPermission);

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
        public List<CreateUserDTO> UpdateUser(CreateUserDTO userDTO, string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);
            if (user == null)
            {
                return null;
            }

            if (!string.IsNullOrEmpty(userDTO.Username))
            {
                user.Username = userDTO.Username;
            }

            if (!string.IsNullOrEmpty(userDTO.FullName))
            {
                user.FullName = userDTO.FullName;
            }

            if (!string.IsNullOrEmpty(userDTO.Password))
            {
                user.PasswordHash = _jwtService.HashPassword(userDTO.Password);
            }

            _context.Users.Update(user);
            _context.SaveChanges();
            return new List<CreateUserDTO> { new CreateUserDTO(user.Username, user.FullName, user.PasswordHash) };
        }

        public CreateUserDTO GetUserDetailsByUserName(string username)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            var userdetails = new CreateUserDTO(username,user.FullName,user.PasswordHash);

            return userdetails;

        }
    }
}
