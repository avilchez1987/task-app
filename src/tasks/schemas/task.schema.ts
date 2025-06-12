// src/tasks/schemas/task.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({
    enum: ['pendiente', 'en_progreso', 'completada'],
    default: 'pendiente',
  })
  status: string;

  @Prop()
  dueDate?: Date;

  @Prop({ enum: ['alta', 'media', 'baja'], default: 'media' })
  priority: string;

  @Prop({ required: true })
  userId: string; // Para asociar la tarea al usuario
}

export const TaskSchema = SchemaFactory.createForClass(Task);
