using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Exceptions;

namespace dotnetapp.Services
{
    public class MentorshipProgramService
    {
        private readonly ApplicationDbContext _context;

        public MentorshipProgramService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MentorshipProgram>> GetAllMentorshipPrograms()
        {
            return await _context.MentorshipPrograms.ToListAsync();
        }

        public async Task<MentorshipProgram?> GetMentorshipProgramById(int mentorshipProgramId)
        {
            var program = await _context.MentorshipPrograms
                .FirstOrDefaultAsync(mp => mp.MentorshipProgramId == mentorshipProgramId);

            if (program == null)
            {
                throw new MentorshipProgramException("Cannot find any mentorship program.");
            }

            return program;
        }

        public async Task<bool> AddMentorshipProgram(MentorshipProgram mentorshipProgram)
        {
            var existingProgram = await _context.MentorshipPrograms
                .FirstOrDefaultAsync(mp => mp.ProgramName == mentorshipProgram.ProgramName);

            if (existingProgram != null)
            {
                throw new MentorshipProgramException("Program with the same name already exists");
            }

            _context.MentorshipPrograms.Add(mentorshipProgram);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> UpdateMentorshipProgram(int mentorshipProgramId, MentorshipProgram mentorshipProgram)
        {
            var existingProgram = await _context.MentorshipPrograms
                .FirstOrDefaultAsync(mp => mp.MentorshipProgramId == mentorshipProgramId);

            if (existingProgram == null)
            {
                return false;
            }

            var duplicateProgram = await _context.MentorshipPrograms
                .FirstOrDefaultAsync(mp => mp.ProgramName == mentorshipProgram.ProgramName 
                                           && mp.MentorshipProgramId != mentorshipProgramId);

            if (duplicateProgram != null)
            {
                throw new MentorshipProgramException("Program with the same name already exists");
            }

            existingProgram.ProgramName = mentorshipProgram.ProgramName;
            existingProgram.Description = mentorshipProgram.Description;
            existingProgram.FieldOfMentorship = mentorshipProgram.FieldOfMentorship;
            existingProgram.DurationInMonths = mentorshipProgram.DurationInMonths;
            existingProgram.MentorName = mentorshipProgram.MentorName;
            existingProgram.ExperienceLevel = mentorshipProgram.ExperienceLevel;
            existingProgram.ModeOfMentorship = mentorshipProgram.ModeOfMentorship;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteMentorshipProgram(int mentorshipProgramId)
        {
            var mentorshipProgram = await _context.MentorshipPrograms
                .FirstOrDefaultAsync(mp => mp.MentorshipProgramId == mentorshipProgramId);

            if (mentorshipProgram == null)
            {
                throw new MentorshipProgramException("Cannot find any mentorship program.");
            }

            var isReferenced = await _context.MentorshipApplications
                .AnyAsync(ma => ma.MentorshipProgramId == mentorshipProgramId);

            if (isReferenced)
            {
                throw new MentorshipProgramException("Mentorship cannot be deleted, it is referenced in MentorshipApplication.");
            }

            _context.MentorshipPrograms.Remove(mentorshipProgram);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}