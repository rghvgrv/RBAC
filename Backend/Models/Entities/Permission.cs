﻿using System;
using System.Collections.Generic;

namespace SampleOAuth.Models.Entities;

public partial class Permission
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int RoleId { get; set; }

    public DateTime? AssignedAt { get; set; }

    public virtual Role Role { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
