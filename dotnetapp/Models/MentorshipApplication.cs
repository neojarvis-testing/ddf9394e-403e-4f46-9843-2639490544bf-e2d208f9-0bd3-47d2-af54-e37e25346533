using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;
namespace dotnetapp.Models
{
    public class MentorshipApplication
    {
        public int MentorshipApplicationId {get; set;}

        [Required(ErrorMessage="Application Status is required")]
        [MaxLength(20,ErrorMessage="Status can't be longer than 20 characters")]
        public string ApplicationStatus {get; set;}

        [Required(ErrorMessage="Application Date is required")]
        public DateTime ApplicationDate {get; set;}

        [Required(ErrorMessage="Reason for applying is required")]
        public string ReasonForApplying {get; set;}

        [Required(ErrorMessage="Career Goals is required")]
        public string CareerGoals{get; set;}

        [Required(ErrorMessage="Portfolio Image is required")]
        public string ProfileImage {get; set;}

        public string? PortfolioLink {get; set;}

        public int? UserId {get; set;}

        [JsonIgnore]
        public User? User{get; set;}

        public int? MentorshipProgramId {get; set;}

        [JsonIgnore]
        public MentorshipProgram? MentorshipProgram {get; set;}
    }
}