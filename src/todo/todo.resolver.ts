
import { Query, Resolver, Args, Int, Mutation } from '@nestjs/graphql';
import { Todo } from 'src/todo/entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto';
import { StatusArgs } from './dto';
import { AggregationType } from './types/aggregation.type';

@Resolver()
export class TodoResolver {

    constructor( 
        private readonly todoService: TodoService
    ) { }

    @Query( () => [Todo], { name: 'todos', description: 'Listado de tareas'})
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[] { 
        return this.todoService.findAll( statusArgs );
    }

    @Query( () => Todo, { name: 'todo', description: 'Una tarea'})
    findOne( 
        @Args( 'id', { type: () => Int } ) id: number
    ): Todo { 
        return this.todoService.findOne( id );
    }

    @Mutation( () => Todo, { name: 'createTodo', description: 'Crear una tarea'})
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ) { 
        return this.todoService.create( createTodoInput );
    }


    @Mutation( () => Todo, { name: 'updateTodo', description: 'Actualizar una tarea'})
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput
    ) { 
        return this.todoService.update( updateTodoInput );
    }


    @Mutation( () => Boolean, { name: 'removeTodo', description: 'Eliminar una tarea'})
    removeTodo(
        @Args( 'id', { type: () => Int } ) id: number
    ) { 
        return this.todoService.remove( id );
    }

    @Query( () => Int , { name: 'totalTodos', description: 'Total de tareas'})
    totalTodos(): number {
        return this.todoService.totalTodos;
    }

    @Query( () => Int , { name: 'completedTodos', description: 'Total de tareas completadas'})
    completedTodos(): number {
        return this.todoService.completedTodos;
    }

    @Query( () => Int , { name: 'pendingTodos', description: 'Total de tareas pendientes'})
    pendingTodos(): number {
        return this.todoService.pendingTodos;
    }


    @Query( () => AggregationType) 
    aggregation(): AggregationType {
        return { 
            total: this.todoService.totalTodos,
            completed: this.todoService.completedTodos,
            pending: this.todoService.pendingTodos,
            totalTodosCompleted: this.todoService.completedTodos
        }
    } 


}
