import { Controller, Post, Body, Version, Patch, Param, Delete, Get, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity } from './entities/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { StatusEnum } from '../common/enums/status.enum';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
@Post()
@Version('1')
addTodoV1(@Body() newTodo: CreateTodoDto): Promise<TodoEntity> {
  return this.todoService.addTodo(newTodo);
}

@Post()
@Version('2')
addTodoV2(@Body() newTodo: CreateTodoDto): Promise<TodoEntity> {
  return this.todoService.addTodo(newTodo);

}

@Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    await this.todoService.updateTodo(id, updateTodoDto);
    return { message: 'Todo mis à jour avec succès' };
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    await this.todoService.deleteTodo(id);
    return { message: 'Todo supprimé avec succès' };
  }
  @Delete('soft/:id')
  async softDeleteTodo(@Param('id') id: string) {
    await this.todoService.softDeleteTodo(id);
    return { message: 'Todo supprimé (soft) avec succès' };
  }
  @Patch('restore/:id')
  async restoreTodo(@Param('id') id: string) {
    await this.todoService.restoreTodo(id);
    return { message: 'Todo restauré avec succès' };
  }
 
  @Get('stats')
  async getTodoStats() {
  return this.todoService.countTodosByStatus();
}
@Get('all')
async getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
  return this.todoService.getAllTodos(page, limit);
}
@Get(':id')
async getTodoById(@Param('id') id: string) {
  return this.todoService.getTodoById(id);
}
@Get('search')
async searchTodos(
  @Query('search') search?: string,
  @Query('status') status?: StatusEnum
): Promise<TodoEntity[]> {
  return this.todoService.searchTodos(search, status);
}
}