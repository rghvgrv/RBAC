namespace SampleOAuth.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(int id);
        bool ValidateToken(string token);
        string GetUserIdFromToken(string token);

        string HashPassword(string password);

    }
}
