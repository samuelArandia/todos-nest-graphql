import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

@InputType()
export class UpdateTodoInput {

    @Field( () => Int, { description: 'Id de la tarea'} )
    @IsInt()
    @Min( 1 )
    id: number;

    @Field( () => String, { description: 'Descripción de la tarea', nullable: true} )
    @IsString()
    @IsNotEmpty()
    @MaxLength( 20 )
    @IsOptional()
    description?: string;

    @Field( () => Boolean, { description: 'Estado de la tarea', nullable: true} )
    @IsOptional()
    @IsBoolean()
    done?: boolean;
}