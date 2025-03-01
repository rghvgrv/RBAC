namespace SampleOAuth.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(int id,int roleid);
        bool ValidateToken(string token);
        string GetUserIdFromToken(string token);

        string HashPassword(string password);
        string GetRoleIdFromToken(string token);
    }
}
