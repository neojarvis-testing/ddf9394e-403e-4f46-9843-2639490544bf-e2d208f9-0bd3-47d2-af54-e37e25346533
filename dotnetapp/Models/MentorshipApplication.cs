using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class MentorshipApplication
    {
        public int MentorshipApplicationId {get; set;}

        public string ApplicationStatus {get; set;}

        public DateTime ApplicationDate {get; set;}

        public string ReasonForApplying {get; set;}

        public string CareerGoals{get; set;}

        public string ProfileImage {get; set;}

        public string? PortfolioLink {get; set;}

        public int UserId {get; set;}

        [JsonIgnore]
        public User? User{get; set;}

        public int MentorshipProgramId {get; set;}

        [JsonIgnore]
        public MentorshipProgram? MentorshipProgram {get; set;}
    }
}