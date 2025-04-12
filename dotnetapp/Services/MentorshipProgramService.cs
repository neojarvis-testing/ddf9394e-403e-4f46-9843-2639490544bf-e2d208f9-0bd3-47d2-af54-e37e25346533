using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;

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
            var res = await _context.MentorshipPrograms.ToListAsync();
            return Ok(res);
        }

        public async Task<MentorshipProgram> GetMentorshipProgramById(int mentorshipProgramId)
        {
            var res = await _context.MentorshipPrograms.FirstOrDefaultAsync(m => m.MentorshipProgramId == mentorshipProgramId);
            if(res == null)
            {
                return NotFound();
            }
            return Ok(res);
        }

        public async Task<bool> AddMentorshipProgram(MentorshipProgram mentorshipProgram)
        {
            var existingProgram = await _context.MentorshipPrograms.FirstOrDefaultAsync(mp => mp.Name == mentorshipProgram.Name);

            if (existingProgram != null)
            {
                throw new MentorshipProgramException("Program with the same name already exists.");
            }

            _context.MentorshipPrograms.Add(mentorshipProgram);
            await _context.SaveChangesAsync();

            return true;  
        }

        public async Task<bool> UpdateMentorshipProgram(int mentorshipProgramId, MentorshipProgram mentorshipProgram)
        {
            var existingProgram = await _context.MentorshipPrograms.FirstOrDefaultAsync(mp => mp.Id == mentorshipProgramId);

            if (existingProgram == null)
            {
                return false;
            }

            var duplicateProgram = await _context.MentorshipPrograms.FirstOrDefaultAsync(mp => mp.Name == mentorshipProgram.Name && mp.Id != mentorshipProgramId);

            if (duplicateProgram != null)
            {
                throw new MentorshipProgramException("Program with the same name already exists.");
            }

            existingProgram.Name = mentorshipProgram.Name;
            existingProgram.Description = mentorshipProgram.Description;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteMentorshipProgram(int mentorshipProgramId)
        {
            var mentorshipProgram = await _context.MentorshipPrograms.FirstOrDefaultAsync(mp => mp.Id == mentorshipProgramId);

            if (mentorshipProgram == null)
            {
                return false;
            }

            var isReferenced = await _context.MentorshipApplications.AnyAsync(ma => ma.MentorshipProgramId == mentorshipProgramId);
        
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