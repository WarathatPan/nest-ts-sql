import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { Repository } from 'typeorm';
import { ModuleA } from './entities/moduleA.entity';
import { CreateModuleADto } from './dto/moduleA.dto';

@Injectable()
export class ModuleAService {
  private redisClient: Redis;
  private readonly logger = new Logger(ModuleAService.name); // กำหนด logger

  constructor(
    @InjectRepository(ModuleA)
    private readonly moduleARepository: Repository<ModuleA>,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = this.redisService.getClient('redis'); // Get redis client
  }

  async createModuleA(createModuleADto: CreateModuleADto) {
    // เพิ่มภาษาใหม่ลงใน SQL
    const moduleA = this.moduleARepository.create(createModuleADto);
    await this.moduleARepository.save(moduleA);

    this.logger.log(
      `ModuleA created and saved to database: ${createModuleADto.name}`,
    ); // บันทึก log

    // ดึงข้อมูลภาษาใหม่ทั้งหมดจาก SQL เพื่อให้แน่ใจว่า cache ถูกต้อง
    const allModuleAs = await this.moduleARepository.find();

    // เซ็ต cache ทับใน Redis
    await this.redisClient.set(
      'moduleAs',
      JSON.stringify(allModuleAs),
      'EX',
      2592000,
    ); // Cache for 30 days (30 * 24 * 60 * 60)

    this.logger.log('ModuleAs cached in Redis'); // บันทึก log การ cache

    return allModuleAs; // ส่งข้อมูลใหม่กลับไป
  }

  async getModuleAs() {
    const cacheKey = 'moduleAs';

    // ลองดึงข้อมูลจาก Redis ก่อน
    let moduleAs: string | ModuleA[] = await this.redisClient.get(cacheKey);
    if (moduleAs) {
      this.logger.log('Fetching moduleAs from Redis cache'); // บันทึก log เมื่อดึงข้อมูลจาก Redis
      return JSON.parse(moduleAs);
    }

    // ถ้าไม่มีใน Redis ให้ดึงจาก SQL Database
    this.logger.log('Fetching moduleAs from SQL Database'); // บันทึก log เมื่อดึงข้อมูลจาก SQL
    moduleAs = await this.moduleARepository.find();

    // บันทึกลง Redis (Cache เวลา 30 วัน)
    await this.redisClient.set(
      cacheKey,
      JSON.stringify(moduleAs),
      'EX',
      2592000,
    ); // Cache for 30 days

    return moduleAs;
  }
}
