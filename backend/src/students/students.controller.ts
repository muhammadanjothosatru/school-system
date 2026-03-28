import { Controller, Get, Post, Body } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
    constructor(private studentsService: StudentsService) { }

    @Post()
    create(@Body() body: CreateStudentDto) {
        return this.studentsService.create(body);
    }

    @Get()
    findAll() {
        return this.studentsService.findAll();
    }
}