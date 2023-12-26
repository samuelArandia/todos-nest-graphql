import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from 'src/todo/entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto';
import { StatusArgs } from './dto';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        { id: 1, description: 'Piedra del alma', done: false },
        { id: 2, description: 'Piedra del espacio', done: true },
        { id: 3, description: 'Piedra del tiempo', done: false },
        { id: 4, description: 'Piedra del poder', done: false },
    ];

    get totalTodos() { 
       return this.todos.length;
    }

    get completedTodos() {
        return this.todos.filter( todo => todo.done === true ).length;
    }

    get pendingTodos() {
        return this.todos.filter( todo => todo.done === false ).length;
    }

    findAll( statusArgs: StatusArgs): Todo[] {
        const { status } = statusArgs;
        if ( status !== undefined ) return this.todos.filter( todo => todo.done === status);
        return this.todos;
    }

    findOne( id: number ): Todo { 
        const todo = this.todos.find( todo => todo.id === id );
        if ( !todo ) throw new NotFoundException(`Todo with id ${id} not found`);
        return todo;
    }

    create( createTodoInput: CreateTodoInput): Todo { 
        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.done = false;
        todo.id = Math.max( ...this.todos.map( todo => todo.id ), 0 ) + 1;

        this.todos.push( todo );
        return todo;
    }

    update(updateTodoInput: UpdateTodoInput){ 
        const { id, description, done } = updateTodoInput;
        const todoToUpdate = this.findOne( id );
        
        if ( description ) todoToUpdate.description = description;
        if ( done !== undefined ) todoToUpdate.done = done;

        this.todos = this.todos.map( t => { 
            return t.id === id ? todoToUpdate : t;
        });
        
        return todoToUpdate;
    }

    remove ( id: number ): Boolean { 
        const todoToRemove = this.findOne( id );
        this.todos = this.todos.filter( todo => todo.id !== id);
        return true;
    }

}
