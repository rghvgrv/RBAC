using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SampleOAuth.Models.Entities;

public partial class SessionManagmentDbContext : DbContext
{
    public SessionManagmentDbContext()
    {
    }

    public SessionManagmentDbContext(DbContextOptions<SessionManagmentDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Auth> Auths { get; set; }

    public virtual DbSet<Permission> Permissions { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\local;Database=SessionManagmentDB;Trusted_Connection=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Auth>(entity =>
        {
            entity.HasKey(e => e.AuthId).HasName("PK__Auth__12C15DD335ACE9C3");

            entity.ToTable("Auth");

            entity.Property(e => e.LoginTime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.LogoutTime).HasColumnType("datetime");
            entity.Property(e => e.Token).HasMaxLength(500);

            entity.HasOne(d => d.User).WithMany(p => p.Auths)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Auth_User");
        });

        modelBuilder.Entity<Permission>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Permissi__3214EC07CD7C0A60");

            entity.Property(e => e.AssignedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Role).WithMany(p => p.Permissions)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_Permissions_Role");

            entity.HasOne(d => d.User).WithMany(p => p.Permissions)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Permissions_User");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3214EC0739333C47");

            entity.HasIndex(e => e.Name, "UQ__Roles__737584F6EA676564").IsUnique();

            entity.Property(e => e.Description).HasMaxLength(255);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C460B8DFC");

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E4FEDC9A9F").IsUnique();

            entity.Property(e => e.FullName).HasMaxLength(200);
            entity.Property(e => e.PasswordHash).HasMaxLength(500);
            entity.Property(e => e.Username).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
