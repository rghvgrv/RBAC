using SampleOAuth.Models.DTO;

namespace SampleOAuth.Repos.Interfaces
{
    public interface IUserRepository
    {
        List<UserDTO> GetUsers();
        UserDTO AddUser(CreateUserDTO createUserDTO);

        List<UserDTO> GetUserDetailByRole(int userId);
    }
}
