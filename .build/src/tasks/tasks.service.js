"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("./schemas/task.schema");
let TasksService = class TasksService {
    taskModel;
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async create(createTask) {
        const task = new this.taskModel(createTask);
        return task.save();
    }
    async findAll(userId, filterDto) {
        const { status, priority, page = '1', limit = '10' } = filterDto;
        const filter = {
            userId,
        };
        if (status)
            filter.status = status;
        if (priority)
            filter.priority = priority;
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
    async findOne(id) {
        const task = await this.taskModel.findById(id);
        if (!task)
            throw new common_1.NotFoundException('Tarea no encontrada');
        return task;
    }
    async update(id, dto) {
        const updated = await this.taskModel.findByIdAndUpdate(id, dto, {
            new: true,
        });
        if (!updated)
            throw new common_1.NotFoundException('Tarea no encontrada');
        return updated;
    }
    async remove(id) {
        const res = await this.taskModel.findByIdAndDelete(id);
        if (!res)
            throw new common_1.NotFoundException('Tarea no encontrada');
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TasksService);
//# sourceMappingURL=tasks.service.js.map