using System;
using System.Collections.Generic;

namespace SampleOAuth.Models.Entities;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public virtual ICollection<Auth> Auths { get; set; } = new List<Auth>();

    public virtual ICollection<Permission> Permissions { get; set; } = new List<Permission>();
}
