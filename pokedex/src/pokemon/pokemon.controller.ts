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
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':searchParam')
  findOne(@Param('searchParam') searchParam: string): Promise<Pokemon> {
    return this.pokemonService.findOne(searchParam);
  }

  @Patch(':searchParam')
  update(
    @Param('searchParam') searchParam: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(+searchParam, updatePokemonDto);
  }

  @Delete(':searchParam')
  remove(@Param('searchParam') searchParam: string) {
    return this.pokemonService.remove(+searchParam);
  }
}
