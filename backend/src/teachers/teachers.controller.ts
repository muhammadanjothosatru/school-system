import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('teachers')
export class TeachersController {
    constructor(private teachersService: TeachersService) { }

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @Post()
    create(@Body() body: any) {
        return this.teachersService.create(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.teachersService.findAll();
    }
}