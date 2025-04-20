export interface MentorshipProgram
{
    MentorshipProgramId?: number;
    ProgramName: string;
    Description: string;
    FieldOfMentorship: string;
    DurationInMonths: number;
    MentorName: string;
    ExperienceLevel: string;
    ModeOfMentorship: string;
    applied?: boolean;
}