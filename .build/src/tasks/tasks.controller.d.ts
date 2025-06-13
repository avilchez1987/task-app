import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthUser } from 'src/auth/interfaces/user.interface';
import { FilterTaskDto } from './dto/filter-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto, req: Request & {
        user: AuthUser;
    }): Promise<import("./schemas/task.schema").Task>;
    findAll(req: Request & {
        user: AuthUser;
    }, filterDto: FilterTaskDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/task.schema").TaskDocument, {}> & import("./schemas/task.schema").Task & import("mongoose").Document<unknown, any, any, Record<string, any>> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<import("./schemas/task.schema").Task>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<import("./schemas/task.schema").Task>;
    remove(id: string): Promise<void>;
}
