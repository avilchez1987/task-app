import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
type CreateTaskWithUserDto = CreateTaskDto & {
    userId: string;
};
export declare class TasksService {
    private taskModel;
    constructor(taskModel: Model<TaskDocument>);
    create(createTask: CreateTaskWithUserDto): Promise<Task>;
    findAll(userId: string, filterDto: FilterTaskDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, TaskDocument, {}> & Task & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<Task>;
    update(id: string, dto: UpdateTaskDto): Promise<Task>;
    remove(id: string): Promise<void>;
}
export {};
