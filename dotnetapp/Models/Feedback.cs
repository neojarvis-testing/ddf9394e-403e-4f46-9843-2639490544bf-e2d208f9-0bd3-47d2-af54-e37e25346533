using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace dotnetapp.Models
{
    public class Feedback
    {
        public int Feedback {get;set;}
        public int UserId {get;set;}
        public User? User {get;set;}
        public string FeedbackText {get;set;}
    }
}