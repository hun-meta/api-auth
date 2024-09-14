import { Expose, Type } from 'class-transformer';

export class TodoResponse {
  @Expose()
  id: string;

  @Expose()
  completed: boolean;
}

export class UsersResponseDto {
  @Expose()
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Type(() => TodoResponse) // 🔑 don't forget to put this
  @Expose() // also the @Expose()
  todos: TodoResponse[];
}