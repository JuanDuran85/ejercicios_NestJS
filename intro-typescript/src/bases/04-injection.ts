import { PokeApiAdapter } from "../api/pokeApi.adapter";
import type { Move, PokeAPIResponse } from "../interfaces/pokeApi.interfaces";

export class Pokemon {
  public get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  constructor(
    public readonly id: number,
    public name: string,
    private readonly http: PokeApiAdapter
  ) {}

  public scream() {
    console.debug(`${this.name.toUpperCase()}!!!`);
  }

  public speak() {
    console.debug(`${this.name}, ${this.name}`);
  }

  public async getMoves(): Promise<Move[]> {
    const { data } = await this.http.get<PokeAPIResponse>(
      "https://pokeapi.co/api/v2/pokemon/4"
    );
    console.debug(data.moves);

    return data.moves;
  }
}

const pokeApiAxios: PokeApiAdapter = new PokeApiAdapter();
export const charmander = new Pokemon(4, "Charmander", pokeApiAxios);

charmander.getMoves();
