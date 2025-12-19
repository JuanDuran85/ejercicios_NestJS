import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from '../pokemon/pokemon.service';
import { CreatePokemonDto } from '../pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter,
  ) {}

  public async executeSeed() {
    await this.pokemonService.removeAll();
    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=450',
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
