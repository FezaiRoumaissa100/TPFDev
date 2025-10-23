import { IsString, IsNotEmpty, MinLength, MaxLength, IsOptional, IsEnum } from 'class-validator';
import { requiredFieldMessage, minLengthMessage, maxLengthMessage } from '../../common/errorMessages/validation-messages';
import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { StatusEnum } from 'src/common/enums/status.enum';

export class CreateTodoDto {
  
  @IsNotEmpty({ message: requiredFieldMessage })
  @IsString()
  @MinLength(3, { message: minLengthMessage(3) })
  @MaxLength(10, { message: maxLengthMessage(10) })
  name: string;

  @IsNotEmpty({ message: requiredFieldMessage })
  @IsString()
  @MinLength(10, { message: minLengthMessage(10) })
  description: string;
  
  @IsOptional()
  @IsEnum(StatusEnum, { message: 'Le statut doit être une valeur valide' })
  status?: StatusEnum;


}
