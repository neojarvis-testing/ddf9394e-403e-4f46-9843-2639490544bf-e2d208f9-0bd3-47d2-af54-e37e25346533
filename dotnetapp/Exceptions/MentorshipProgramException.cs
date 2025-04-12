using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Exceptions; 

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