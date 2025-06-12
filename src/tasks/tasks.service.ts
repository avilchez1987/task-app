import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskModel.create(createTaskDto);
  }

  async findAll(
    userId: string,
    status?: string,
    priority?: string,
  ): Promise<Task[]> {
    const filters: any = { userId };
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    return this.taskModel.find(filters).sort({ dueDate: 1 });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Tarea no encontrada');
    return task;
  }

  async update(id: string, dto: UpdateTaskDto): Promise<Task> {
    const updated = await this.taskModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Tarea no encontrada');
    return updated;
  }

  async remove(id: string): Promise<void> {
    const res = await this.taskModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException('Tarea no encontrada');
  }
}
