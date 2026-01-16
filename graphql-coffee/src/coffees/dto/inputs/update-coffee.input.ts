import { InputType, PartialType } from '@nestjs/graphql';

import { CreateCoffeeInputDto } from './create-coffee.input';

@InputType({ description: 'Update a coffee' })
export class UpdateCoffeeInputDto extends PartialType(CreateCoffeeInputDto) {}
