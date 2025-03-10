﻿namespace SampleOAuth.Models.DTO
{
    public class UserDTO
    {
        public string Username { get; set; } = null!;
        public string FullName { get; set; } = null!;

        public UserDTO(string username, string fullname)
        {
            Username = username;
            FullName = fullname;
        }

    }

    public class CreateUserDTO
    {
        public string? Username { get; set; } 
        public string? FullName { get; set; } 
        public string? Password { get; set; }

        public CreateUserDTO(string username, string fullname,string password)
        {
            Username = username;
            FullName = fullname;
            Password = password;
        }
    }
}
