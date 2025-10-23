import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { StatusEnum } from '../../common/enums/status.enum';
import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {

}