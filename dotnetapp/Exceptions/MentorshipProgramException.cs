using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Exceptions
{
    public class MentorshipProgramException : Exception
    {
        public MentorshipProgramException() : base() 
        {

        }
        
        public MentorshipProgramException(string message) : base(message)
        {

        }
    }
}