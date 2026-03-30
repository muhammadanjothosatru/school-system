import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('schedules')
export class SchedulesController {
    constructor(private schedulesService: SchedulesService) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @Post()
    create(@Body() body: any) {
        return this.schedulesService.create(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.schedulesService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('class/:id')
    findByClass(@Param('id') id: string) {
        return this.schedulesService.findByClass(id);
    }
}