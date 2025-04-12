using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        }

        public async Task<MentorshipProgram> GetMentorshipProgramById(int mentorshipProgramId)
        {

        }

        public async Task<bool> AddMentorshipProgram(MentorshipProgram mentorshipProgram)
        {

        }

        
    }
}