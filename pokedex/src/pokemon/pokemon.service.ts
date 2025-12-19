import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, DeleteResult } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  public async create(
    createPokemonDto: CreatePokemonDto,
  ): Promise<CreatePokemonDto | undefined> {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();

      return await this.pokemonModel.create(createPokemonDto);
    } catch (error) {
      console.error(String(error));
      this.handleExceptions(error);
    }
  }

  public async createMany(createPokemonDto: CreatePokemonDto[]) {
    try {
      return await this.pokemonModel.insertMany(createPokemonDto);
    } catch (error) {
      console.error(String(error));
      this.handleExceptions(error);
    }
  }

  public async findAll(paginationDto: PaginationDto): Promise<Pokemon[]> {
    const { limit = 10, offset = 0 } = paginationDto;
    return await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .sort({ no: 1 });
  }

  public async findOne(searchParam: string): Promise<Pokemon> {
    let pokemon: Pokemon | null = Number.isNaN(+searchParam)
      ? null
      : await this.pokemonModel.findOne({
          no: +searchParam,
        });

    if (!pokemon && isValidObjectId(searchParam)) {
      pokemon = await this.pokemonModel.findById(searchParam);
    }

    pokemon ??= await this.pokemonModel.findOne({
      name: searchParam.toLowerCase().trim(),
    });

    if (!pokemon) {
      throw new NotFoundException(
        `Pokemon with id, name or number ${searchParam} not found`,
      );
    }

    return pokemon;
  }

  public async update(searchParam: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon: Pokemon = await this.findOne(searchParam);

    if (updatePokemonDto.name)
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();

    try {
      const updatedProcess = await pokemon.updateOne(updatePokemonDto, {
        new: true,
      });

      return {
        updatedProcess,
        message: `Pokemon updated successfully`,
        updatedPokemon: {
          ...pokemon.toJSON(),
        },
      };
    } catch (error) {
      console.error(error);
      this.handleExceptions(error);
    }
  }

  public async remove(deleteParam: string): Promise<Pokemon> {
    const resultDelete = await this.pokemonModel.findByIdAndDelete(deleteParam);

    if (!resultDelete) {
      throw new NotFoundException(`Pokemon with id ${deleteParam} not found`);
    }

    return resultDelete;
  }

  public async removeAll(): Promise<DeleteResult> {
    return await this.pokemonModel.deleteMany({});
  }

  private handleExceptions(error: any) {
    if (error.code === 11_000) {
      throw new BadRequestException(
        `Pokemon already exists. ${JSON.stringify(error.keyValue)}`,
      );
    }

    throw new InternalServerErrorException(
      `Can't update pokemon - Check server logs`,
    );
  }
}
