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

        public string ProgramName {get; set;}

        public string Description {get; set;}

        public string FieldOfMentorship {get; set;}

        public int DurationInMonths {get; set;}

        public string MentorName {get; set;}

        public string ExperienceLevel {get; set;}

        public string ModeOfMentorship {get; set;}
    }
}