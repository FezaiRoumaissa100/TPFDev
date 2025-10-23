import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from 'typeorm';
import { StatusEnum } from '../../common/enums/status.enum';
import { BaseEntityTime } from '../../common/base.entity';

@Entity('todo')
export class TodoEntity extends BaseEntityTime  {
    @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'enum', enum: StatusEnum, default: StatusEnum.PENDING })
  status: StatusEnum;
}
