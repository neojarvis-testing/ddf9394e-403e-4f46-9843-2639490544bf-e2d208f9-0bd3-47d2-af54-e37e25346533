using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace dotnetapp.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<User> Users {get; set;}

        public DbSet<MentorshipProgram> MentorshipPrograms {get; set;}

        public DbSet<MentorshipApplication> MentorshipApplications {get; set;}

        public DbSet<Feedback> Feedbacks {get; set;}
    }
}


 