import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  constructor(private readonly pokemonService: PokemonService) {}

  public async executeSeed() {
    await this.pokemonService.removeAll();
    const { data } = await this.axios.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=350',
    );

    const pokemonToInsert: CreatePokemonDto[] = data.results.map(
      ({ name, url }) => {
        const no: number = Number(url.split('/').at(-2));
        return { name, no } as CreatePokemonDto;
      },
    );

    await this.pokemonService.createMany(pokemonToInsert);

    return {
      message: 'Seed executed successfully',
      pokemonCreated: pokemonToInsert.length,
    };
  }
}
