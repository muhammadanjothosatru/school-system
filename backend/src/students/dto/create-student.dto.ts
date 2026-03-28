export class CreateStudentDto {
    name: string;
    email: string;
    password: string;

    nis: string;
    classId: string;
    schoolType: 'SD' | 'SMP' | 'SMA';
}