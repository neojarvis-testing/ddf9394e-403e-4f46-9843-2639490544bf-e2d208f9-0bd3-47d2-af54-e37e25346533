using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class MentorshipProgram
    {
        [Key]
        public int MentorshipProgramId {get; set;}

        [Required(ErrorMessage="Program Name is required")]
        public string ProgramName {get; set;}

        [Required(ErrorMessage="Description is required")]
        public string Description {get; set;}

        [Required(ErrorMessage="Field of Mentorship is required")]
        public string FieldOfMentorship {get; set;}

        [Required(ErrorMessage="Duration in Months is required")]
        [Range(0,100, ErrorMessage="Duration in Months must be between 0 and 100")]
        public int DurationInMonths {get; set;}

        [Required(ErrorMessage="Mentor Name is required")]
        public string MentorName {get; set;}

        [Required(ErrorMessage="Experience Level is required")]
        public string ExperienceLevel {get; set;}

        [Required(ErrorMessage="Mode of Mentorship is required")]
        public string ModeOfMentorship {get; set;}
    }
}