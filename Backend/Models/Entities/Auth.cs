using System;
using System.Collections.Generic;

namespace SampleOAuth.Models.Entities;

public partial class Auth
{
    public int AuthId { get; set; }

    public int UserId { get; set; }

    public string Token { get; set; } = null!;

    public DateTime? LoginTime { get; set; }

    public DateTime? LogoutTime { get; set; }

    public virtual User User { get; set; } = null!;
}
