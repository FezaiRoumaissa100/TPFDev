import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseEntityTime {
  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}