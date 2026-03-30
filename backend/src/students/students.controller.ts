import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('students')
export class StudentsController {
    constructor(private studentsService: StudentsService) { }

    @Post()
    create(@Body() body: CreateStudentDto) {
        return this.studentsService.create(body);
    }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    @Roles('ADMIN')
    findAll() {
        return this.studentsService.findAll();
    }

    @Post('create-class')
    createClass() {
        return this.studentsService.createClass();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.studentsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.studentsService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.studentsService.remove(id);
    }
}