import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    UseGuards,
} from '@nestjs/common';
import { AttendancesService } from './attendances.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('attendances')
export class AttendancesController {
    constructor(private attendancesService: AttendancesService) { }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() body: any) {
        return this.attendancesService.create(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('class/:classId')
    findByClass(@Param('classId') classId: string) {
        return this.attendancesService.findByClass(classId);
    }
}