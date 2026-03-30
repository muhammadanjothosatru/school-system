import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SchedulesModule } from './schedules/schedules.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [StudentsModule, PrismaModule, AuthModule, SchedulesModule, TeachersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
