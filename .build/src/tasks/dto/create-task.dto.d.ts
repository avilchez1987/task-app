export declare enum TaskStatus {
    PENDIENTE = "pendiente",
    EN_PROGRESO = "en_progreso",
    COMPLETADA = "completada"
}
export declare enum TaskPriority {
    BAJA = "baja",
    MEDIA = "media",
    ALTA = "alta"
}
export declare class CreateTaskDto {
    title: string;
    description?: string;
    status?: TaskStatus;
    dueDate?: Date;
    priority?: TaskPriority;
}
