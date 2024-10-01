import { Exclude, Expose, Type } from 'class-transformer';

export class TodoResponse {
    id: string;

    completed: boolean;
}

export class UsersResponseDto {
    id: string;

    @Exclude()
    firstName: string;

    lastName: string;

    @Type(() => TodoResponse) // 🔑 don't forget to put this
    todos: TodoResponse[];
}
