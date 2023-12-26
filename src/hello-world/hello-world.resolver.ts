import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query( () => String, { description: 'Saluda al mundo es lo que retorna', name: 'hello' })
    helloWorld(): string {
        return 'Hola mundo';
    }

    @Query( () => Float, {name: 'randomNumber'})  
    getrandomNumber(): number {
        return Math.random() * 100;
    }

    @Query( () => Int, {description: 'from zero to arguments to', name: 'randomFromZeroTo'})
    getrandomFromZeroTo( 
        @Args('to', { type: () => Int, nullable: true }) to: number = 6
    ): number { 
        return Math.floor(Math.random() * to);
    }
}
