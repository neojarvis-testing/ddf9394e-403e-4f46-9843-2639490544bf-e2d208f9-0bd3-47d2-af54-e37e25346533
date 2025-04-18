using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    //[AllowAnonymous]
    public class MentorshipApplicationController : ControllerBase
    {
        private readonly MentorshipApplicationService _mentorshipApplicationService;
        public MentorshipApplicationController(MentorshipApplicationService mentorshipApplicationService)
        {
            _mentorshipApplicationService = mentorshipApplicationService;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("mentorship-application")]
        public async Task<ActionResult<IEnumerable<MentorshipApplication>>> GetAllMentorshipApplications()
        {
            try
            {
                var applications = await _mentorshipApplicationService.GetAllMentorshipApplications();
                return Ok(applications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("mentorship-application/user/{userId}")]
        public async Task<ActionResult<IEnumerable<MentorshipApplication>>> GetMentorshipApplicationByUserId(int userId)
        {
            try
            {
                var applications = await _mentorshipApplicationService.GetMentorshipApplicationsByUserId(userId);
                if (applications == null || !applications.Any())
                {
                    return NotFound("Cannot find any mentorship application");
                }
                return Ok(applications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "User")]
        [HttpPost("mentorship-application")]
        public async Task<ActionResult> AddMentorshipApplication([FromBody] MentorshipApplication mentorshipApplication)
        {
            try
            {
                var result = await _mentorshipApplicationService.AddMentorshipApplication(mentorshipApplication);
                if (result)
                    return Ok("Mentorship application added successfully");
                return BadRequest("Failed to add mentorship application");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "Admin, User")]
        [HttpPut("mentorship-application/{mentorshipApplicationId}")]
        public async Task<ActionResult> UpdateMentorshipApplication(int mentorshipApplicationId, [FromBody] MentorshipApplication mentorshipApplication)
        {
            try
            {
                var updated = await _mentorshipApplicationService.UpdateMentorshipApplication(mentorshipApplicationId, mentorshipApplication);
                if (updated)
                    return Ok("Mentorship application updated successfully");
                return NotFound("Cannot find any mentorship application");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Authorize(Roles = "Admin, User")]
        [HttpDelete("mentorship-application/{mentorshipApplicationId}")]
        public async Task<ActionResult> DeleteMentorshipApplication(int mentorshipApplicationId)
        {
            try
            {
                var deleted = await _mentorshipApplicationService.DeleteMentorshipApplication(mentorshipApplicationId);
                if (deleted)
                    return Ok("Mentorship application deleted successfully");
                return NotFound("Cannot find any mentorship application");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
