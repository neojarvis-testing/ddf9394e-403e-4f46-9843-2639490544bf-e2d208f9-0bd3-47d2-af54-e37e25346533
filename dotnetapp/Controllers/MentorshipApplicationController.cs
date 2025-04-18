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

        [HttpGet("mentorship-application")]
        [Authorize(Roles = "Admin")]
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

        [HttpGet("mentorship-application/user/{userId}")]
        [Authorize(Roles = "Admin, User")]
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

        [HttpPost("mentorship-application")]
        [Authorize(Roles = "User")]
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

        [HttpPut("mentorship-application/{mentorshipApplicationId}")]
        [Authorize(Roles = "Admin, User")]
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

        [HttpDelete("mentorship-application/{mentorshipApplicationId}")]
        [Authorize(Roles = "User")]
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
