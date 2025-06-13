import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

type CreateTaskWithUserDto = CreateTaskDto & { userId: string };

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(createTask: CreateTaskWithUserDto): Promise<Task> {
    const task = new this.taskModel(createTask);
    return task.save();
  }

  async findAll(userId: string, filterDto: FilterTaskDto) {
    const { status, priority, page = '1', limit = '10' } = filterDto;
    const filter: Partial<Record<'status' | 'priority' | 'userId', string>> = {
      userId,
    };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const [data, total] = await Promise.all([
      this.taskModel.find(filter).skip(skip).limit(parseInt(limit)).exec(),
      this.taskModel.countDocuments(filter),
    ]);

    return {
      data,
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
    };
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
