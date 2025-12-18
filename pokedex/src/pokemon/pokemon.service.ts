import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  public async create(
    createPokemonDto: CreatePokemonDto,
  ): Promise<CreatePokemonDto> {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();

      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      console.error(String(error));
      if (error.code === 11_000)
        throw new BadRequestException(
          `Pokemon already exists. ${JSON.stringify(error.keyValue)}`,
        );
      throw new InternalServerErrorException(
        `Can't create pokemon - Check server logs`,
      );
    }
  }

  public findAll() {
    return `This action returns all pokemon`;
  }

  public findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  public update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  public remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
