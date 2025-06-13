import { IsOptional, IsIn, IsNumberString, IsString } from 'class-validator';

export class FilterTaskDto {
  @IsOptional()
  @IsString()
  @IsIn(['pendiente', 'en_progreso', 'completada']) // tus valores reales
  status?: string;

  @IsOptional()
  @IsString()
  @IsIn(['baja', 'media', 'alta']) // tus valores reales
  priority?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;
}
