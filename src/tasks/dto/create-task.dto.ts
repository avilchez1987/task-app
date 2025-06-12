import { IsString, IsOptional, IsIn, IsDateString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['pendiente', 'en_progreso', 'completada'])
  status?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @IsOptional()
  @IsIn(['alta', 'media', 'baja'])
  priority?: string;

  @IsString()
  userId: string; // Temporal hasta tener Cognito
}
