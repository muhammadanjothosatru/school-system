import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SchedulesService {
    constructor(private prisma: PrismaService) { }

    async create(data: any) {
        const classData = await this.prisma.class.findUnique({
            where: { id: data.classId },
        });

        if (!classData) {
            throw new BadRequestException('Class tidak ditemukan');
        }

        // 🔥 VALIDASI SMP/SMA WAJIB ADA SUBJECT
        if (
            (classData.schoolType === 'SMP' || classData.schoolType === 'SMA') &&
            !data.subjectId
        ) {
            throw new BadRequestException('Subject wajib untuk SMP/SMA');
        }

        return this.prisma.schedule.create({
            data,
            include: {
                class: true,
                teacher: {
                    include: { user: true },
                },
                subject: true,
            },
        });
    }

    findAll() {
        return this.prisma.schedule.findMany({
            include: {
                class: true,
                teacher: {
                    include: { user: true },
                },
                subject: true,
            },
        });
    }

    findByClass(classId: string) {
        return this.prisma.schedule.findMany({
            where: { classId },
            include: {
                teacher: {
                    include: { user: true },
                },
                subject: true,
            },
        });
    }
}