using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace dotnetapp.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<User> Users {get; set;}

        // public DbSet<UserRoles> UserRoles {get; set;} 

        public DbSet<MentorshipProgram> MentorshipPrograms {get; set;}

        public DbSet<MentorshipApplication> MentorshipApplications {get; set;}

        public DbSet<Feedback> Feedbacks {get; set;}

        // public DbSet<LoginModel> LoginModels {get; set;}

    //     protected override void OnModelCreating(ModelBuilder modelBuilder)
    //     {

    //   modelBuilder.Entity<Feedback>()
    //     .HasOne(f => f.User)
    //     .WithMany()
    //     .HasForeignKey(f => f.UserId)
    //     .OnDelete(DeleteBehavior.Cascade);
 
    //   modelBuilder.Entity<MentorshipApplication>()
    //     .HasOne(ma => ma.User)
    //     .WithMany()
    //     .HasForeignKey(ma => ma.UserId)
    //     .OnDelete(DeleteBehavior.Cascade);
 
    //   modelBuilder.Entity<MentorshipApplication>()
    //     .HasOne(ma => ma.MentorshipProgram)
    //     .WithMany()
    //     .HasForeignKey(ma => ma.MentorshipProgramId)
    //     .OnDelete(DeleteBehavior.Cascade);
    // }

        
    }
}


 