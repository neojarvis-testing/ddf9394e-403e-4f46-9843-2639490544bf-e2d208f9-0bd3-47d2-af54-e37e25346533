using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;
namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/mentorship-program")]
    [AllowAnonymous]
    public class MentorshipProgramController : ControllerBase
    {
        private readonly MentorshipProgramService _mentorshipProgramService;

        public MentorshipProgramController(MentorshipProgramService mentorshipProgramService)
        {
            _mentorshipProgramService = mentorshipProgramService;
        }

        [HttpGet]
      //  [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<MentorshipProgram>>> GetAllMentorshipPrograms()
        {
            try
            {
                var programs = await _mentorshipProgramService.GetAllMentorshipPrograms();
                return Ok(programs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{mentorshipProgramId}")]
        public async Task<ActionResult<MentorshipProgram>> GetMentorshipProgramById(int mentorshipProgramId)
        {
            try
            {
                var program = await _mentorshipProgramService.GetMentorshipProgramById(mentorshipProgramId);
                if (program == null)
                {
                    return NotFound(new{message = "Cannot find any mentorship program."});
                }
                return Ok(program);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]

        // [Authorize(Roles = "Admin")]

        public async Task<ActionResult> AddMentorshipProgram([FromBody] MentorshipProgram mentorshipProgram)
        {
            try
            {
                var result = await _mentorshipProgramService.AddMentorshipProgram(mentorshipProgram);
                if (result)
                {
                    return Ok(new{message = "Mentorship Program added successfully."});
                }
                return StatusCode(500, "Failed to add mentorship program.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{mentorshipProgramId}")]
        public async Task<ActionResult> UpdateMentorshipProgram(int mentorshipProgramId, [FromBody] MentorshipProgram mentorshipProgram)
        {
            try
            {
                var result = await _mentorshipProgramService.UpdateMentorshipProgram(mentorshipProgramId, mentorshipProgram);
                if (result)
                {
                    return Ok(new{message = "Mentorship Program updated successfully."});
                }
                return NotFound(new{message = "Cannot find any mentorship program."});
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{mentorshipProgramId}")]
        public async Task<ActionResult> DeleteMentorshipProgram(int mentorshipProgramId)
        {
            try
            {
                var result = await _mentorshipProgramService.DeleteMentorshipProgram(mentorshipProgramId);
                if (result)
                {
                    return Ok(new{message = "Mentorship Program deleted successfully."});
                }
                return NotFound(new{message = "Cannot find any mentorship program."});
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}