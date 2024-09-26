import { Module } from '@nestjs/common';
import { ModuleAController } from './moduleA.controller';
import { ModuleAService } from './moduleA.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleA } from './entities/moduleA.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ModuleA]), // Entity ของ SQL Table
  ],
  controllers: [ModuleAController],
  providers: [ModuleAService],
})
export class ModuleAModule {}
