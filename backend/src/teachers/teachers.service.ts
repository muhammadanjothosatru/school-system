import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TeachersService {
    constructor(private prisma: PrismaService) { }

    async create(data: any) {
        // cek email sudah ada atau belum
        const existing = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existing) {
            throw new BadRequestException('Email sudah digunakan');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: 'GURU',

                // 🔥 otomatis buat teacher
                teacher: {
                    create: {},
                },
            },
            include: {
                teacher: true,
            },
        });
    }

    findAll() {
        return this.prisma.teacher.findMany({
            include: {
                user: true,
            },
        });
    }
}