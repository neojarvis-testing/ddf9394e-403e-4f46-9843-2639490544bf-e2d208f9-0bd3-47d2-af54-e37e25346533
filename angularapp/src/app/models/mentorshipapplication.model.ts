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
}