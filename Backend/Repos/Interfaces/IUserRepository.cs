using SampleOAuth.Models.DTO;

namespace SampleOAuth.Repos.Interfaces
{
    public interface IUserRepository
    {
        List<UserDTO> GetUsers();
        UserDTO AddUser(CreateUserDTO createUserDTO);
        List<UserDTO> GetUserDetailByRole(int userId);
        List<CreateUserDTO> UpdateUser(CreateUserDTO userDTO,string username);
        CreateUserDTO GetUserDetailsByUserName(string username);
    }
}
