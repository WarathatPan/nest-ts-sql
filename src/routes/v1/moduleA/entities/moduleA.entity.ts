import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('modulea')
export class ModuleA {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean; // กำหนดว่าภาษาใช้งานอยู่หรือไม่

  @Column({ nullable: true })
  createdBy?: string; // ผู้สร้าง (ถ้ามี)

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // วันที่สร้าง

  @Column({ nullable: true })
  updatedBy?: string; // ผู้แก้ไขล่าสุด (ถ้ามี)

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date; // วันที่แก้ไขล่าสุด
}
