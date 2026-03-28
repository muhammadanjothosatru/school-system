import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateStudentDto) {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: 'SISWA',

                student: {
                    create: {
                        nis: data.nis,
                        classId: data.classId,
                        schoolType: data.schoolType,
                    },
                },
            },
            include: {
                student: true,
            },
        });
    }

    findAll() {
        return this.prisma.student.findMany({
            include: {
                user: true,
                class: true,
            },
        });
    }
}