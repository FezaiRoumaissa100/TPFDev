import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { StatusEnum } from '../common/enums/status.enum';
import { todo } from 'node:test';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  async addTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return  this.todoRepository.save(createTodoDto);
  }


   async updateTodo(id: string, updateDto: UpdateTodoDto): Promise<TodoEntity> {
    const newtodo = await this.todoRepository.preload({id,...todo});

    if (!newtodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
      return  this.todoRepository.save(newtodo) ;
  }


  async deleteTodo(id: string): Promise<void> {
    const result = await this.todoRepository.delete(id); 

    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

  }

    // Soft delete
  async softDeleteTodo(id: string): Promise<void> {
    const result = await this.todoRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

  }

  // Restore
  async restoreTodo(id: string): Promise<void> {
    const result = await this.todoRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found or not deleted`);
    }
  }

  async countTodosByStatus() {
  return this.todoRepository
    .createQueryBuilder("todo")
    .select("todo.status", "status")
    .addSelect("COUNT(todo.id)", "count")
    .groupBy("todo.status")
    .getRawMany();
}

async getAllTodos(page: number, nbpage: number): Promise<TodoEntity[]> {
  const qb = this.todoRepository.createQueryBuilder("todo");
  return applyPagination(qb, page, nbpage)
    .getMany();
}
async getTodoById(id: string): Promise<TodoEntity> {
  const todo = await this.todoRepository.findOne({ where: { id } });

  if (!todo) {
    throw new NotFoundException(`Todo avec l'ID ${id} non trouvé`);
  }

  return  todo;
}
async searchTodos(
    search?: string,
    status?: StatusEnum
  ): Promise<TodoEntity[]> {
    const qb = this.todoRepository.createQueryBuilder('todo');
    if (search) {
      qb.andWhere(
        '(todo.name LIKE :search OR todo.description LIKE :search)',
        { search: `%${search}%` }
      );
    }
    if (status) {
      qb.andWhere('todo.status = :status', { status });
    }
    return qb.getMany();
  }
  
  
}

export function applyPagination<Entity extends Object>(
  queryBuilder: SelectQueryBuilder<Entity>,
  page: number,
  nbpage: number
): SelectQueryBuilder<Entity> {
  const offset = (page - 1) * nbpage;
  return queryBuilder.skip(offset).take(nbpage);
}