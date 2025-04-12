using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Data; 
using dotnetapp.Models;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class MentorshipApplicationService
    {
        private readonly ApplicationDbContext _context;

        public MentorshipApplicationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MentorshipApplication>> GetAllMentorshipApplications()
        {
            return await _context.MentorshipApplication
                    .Include(ma => ma.User)
                    .Include(ma => ma.MentorshipProgram)
                    .ToListAsync();
        }
        
        public async Task<IEnumerable<MentorshipApplication>> GetAllMentorshipApplicationsByUserId(int userId)
        {
            return await _context.MentorshipApplications
                    .Where(ma => ma.UserId == userId)
                    .Include(ma => ma.MentorshipProgram)
                    .ToListAsync(); 
        }

        public async Task<bool> AddMentorshipApplication(MentorshipApplication mentorshipApplication)
        {
            bool alreadyApplied = await _context.MentorshipApplication.AnyAsync(ma => 
                    ma.UserId = mentorshipApplication.UserId && ma.MentorshipProgramId == mentorshipApplication.MentorshipProgramId);

            if(alreadyApplied)
            {
                throw new MentorshipException("User already applied for this mentorship");
            }

            mentorshipApplication.ApplicationDate = DateTime.UtcNow;

            _context.MentorshipApplications.Add(mentorshipApplication);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateMentorshipApplication(int MentorshipApplicationId, MentorshipApplication mentorshipApplication)
        {
            var existing = await _context.MentorshipApplications.FindAsync(MentorshipApplicationId);

            if(existing == null)
            {
                return false;
            }

            existing.ApplicationStatus = mentorshipApplication.ApplicationStatus;
            existing.ReasonForApplying = mentorshipApplication.ReasonForApplying;
            existing.CareerGoals = mentorshipApplication.CareerGoals;
            existing.ProfileImage = mentorshipApplication.ProfileImage;
            existing.PortfolioLink = mentorshipApplication.PortfolioLink;

            _context.MentorshipApplications.Update(existing);
            await _context.SaveChangesAsync();
            return true;

        }

        public async Task<bool> DeleteMentorshipApplication(int mentorshipApplicationId)
        {
            var application = await _context.MentorshipApplications.FindAsync(mentorshipApplicationId);

            if (application == null)
            {
                return false;
            }

            _context.MentorshipApplications.Remove(application);
            await _context.SaveChangesAsync();
            return true;        
        }
    }
}