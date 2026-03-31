import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateStudentDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: 'ADMIN',

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
        return this.prisma.student.findMany();
    }

    async createClass() {
        return this.prisma.class.create({
            data: {
                name: '7A',
                grade: 7,
                schoolType: 'SMP',
            },
        });
    }

    findOne(id: string) {
        return this.prisma.student.findUnique({
            where: { id },
            include: {
                user: true,
                class: true,
            },
        });
    }

    async update(id: string, data: any) {
        return this.prisma.student.update({
            where: { id },
            data: {
                ...(data.nis && { nis: data.nis }),
                ...(data.classId && { classId: data.classId }),
                user: {
                    update: {
                        ...(data.name && { name: data.name }),
                        ...(data.email && { email: data.email }),
                    },
                },
            },
            include: {
                user: true,
            },
        });
    }

    async remove(id: string) {
        return this.prisma.student.delete({
            where: { id },
        });
    }
}