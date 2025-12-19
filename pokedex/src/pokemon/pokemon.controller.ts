import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public createMany(@Body() createPokemonDto: CreatePokemonDto[]) {
    return this.pokemonService.createMany(createPokemonDto);
  }

  @Get()
  public findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  @Get(':searchParam')
  public findOne(@Param('searchParam') searchParam: string): Promise<Pokemon> {
    return this.pokemonService.findOne(searchParam);
  }

  @Patch(':searchParam')
  public update(
    @Param('searchParam') searchParam: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(searchParam, updatePokemonDto);
  }

  @Delete(':deleteParam')
  public remove(
    @Param('deleteParam', ParseMongoIdPipe) deleteParam: string,
  ): Promise<Pokemon> {
    return this.pokemonService.remove(deleteParam);
  }

  @Delete()
  public removeAll() {
    return this.pokemonService.removeAll();
  }
}
