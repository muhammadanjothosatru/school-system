import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendancesService {
    constructor(private prisma: PrismaService) { }

    async create(data: any) {
        const student = await this.prisma.student.findUnique({
            where: { id: data.studentId },
        });

        if (!student) {
            throw new BadRequestException('Student tidak ditemukan');
        }

        return this.prisma.attendance.create({
            data: {
                studentId: data.studentId,
                date: new Date(data.date),
                status: data.status, // sekarang enum
            },
            include: {
                student: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }

    async findByClass(classId: string) {
        return this.prisma.attendance.findMany({
            where: {
                student: {
                    classId: classId,
                },
            },
            include: {
                student: {
                    include: {
                        user: true,
                    },
                },
            },
        });
    }
}