import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ModuleAService } from './moduleA.service';
import { CreateModuleADto } from './dto/moduleA.dto';

@Controller('moduleAs')
export class ModuleAController {
  private readonly logger = new Logger(ModuleAController.name); // กำหนด logger

  constructor(private readonly moduleAService: ModuleAService) {}

  @Post()
  async createModuleA(@Body() createModuleADto: CreateModuleADto) {
    try {
      this.logger.log(`Creating new moduleA: ${createModuleADto.name}`); // บันทึก log

      const moduleAs =
        await this.moduleAService.createModuleA(createModuleADto);

      this.logger.log(`ModuleA created successfully: ${createModuleADto.name}`); // บันทึก log เมื่อสร้างสำเร็จ

      return {
        message: 'ModuleA created successfully',
        data: moduleAs,
      };
    } catch (error) {
      this.logger.error(
        `Error creating moduleA: ${createModuleADto.name}`,
        error.stack,
      ); // บันทึก log เมื่อเกิดข้อผิดพลาด

      throw new InternalServerErrorException('Failed to create moduleA');
    }
  }

  @Get()
  async getModuleAs() {
    try {
      const moduleAs = await this.moduleAService.getModuleAs();
      return {
        message: 'ModuleAs fetched successfully',
        data: moduleAs,
      };
    } catch (error) {
      console.error('Error fetching moduleAs:', error);
      throw new InternalServerErrorException('Failed to fetch moduleAs');
    }
  }
}
