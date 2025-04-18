import { MentorshipProgram } from "./mentorshipprogram.model";
import { User } from "./user.model";

export interface MentorshipApplication
{
    MentorshipApplicationId?: number;
    UserId: number;
    MentorshipProgramId: number;
    ReasonForApplying: string;
    CareerGoals: string;
    ProfileImage: string;
    PortfolioLink?: string;
    ApplicationStatus: string;
    ApplicationDate: string;
    User? : User;
    MentorshipProgram?:MentorshipProgram;
}