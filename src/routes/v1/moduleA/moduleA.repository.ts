import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleA } from './entities/moduleA.entity';

@Injectable()
export class ModuleARepository {
  constructor(
    @InjectRepository(ModuleA)
    private readonly moduleARepository: Repository<ModuleA>,
  ) {}

  async createModuleA(moduleAData: Partial<ModuleA>): Promise<ModuleA> {
    const newModuleA = this.moduleARepository.create(moduleAData);
    return await this.moduleARepository.save(newModuleA);
  }

  async findAll(): Promise<ModuleA[]> {
    return await this.moduleARepository.find();
  }

  async findOneById(id: number): Promise<ModuleA> {
    return await this.moduleARepository.findOne({ where: { id } });
  }

  async updateModuleA(id: number, updateData: Partial<ModuleA>): Promise<void> {
    await this.moduleARepository.update(id, updateData);
  }

  async deleteModuleA(id: number): Promise<void> {
    await this.moduleARepository.delete(id);
  }
}
