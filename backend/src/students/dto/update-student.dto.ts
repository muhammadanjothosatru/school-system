import { IsOptional, IsEmail } from 'class-validator';

export class UpdateStudentDto {
    @IsOptional()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    nis?: string;

    @IsOptional()
    classId?: string;
}