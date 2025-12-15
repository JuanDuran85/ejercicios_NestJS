import {
  PokeApiAxiosAdapter,
  PokeApiFetchAdapter,
  type HttpAdapter,
} from "../api/pokeApi.adapter";
import type { Move, PokeAPIResponse } from "../interfaces/pokeApi.interfaces";

export class Pokemon {
  public get imageUrl(): string {
    return `https://pokemon.com/${this.id}.jpg`;
  }

  constructor(
    public readonly id: number,
    public name: string,
    private readonly http: HttpAdapter
  ) {}

  public scream() {
    console.log(`${this.name.toUpperCase()}!!!`);
  }

  public speak() {
    console.log(`${this.name}, ${this.name}`);
  }

  public async getMoves(): Promise<Move[]> {
    console.log(this.id);
    const data = await this.http.get<PokeAPIResponse>(
      `https://pokeapi.co/api/v2/pokemon/${this.id}`
    );
    return data.moves;
  }
}

const pokeApiAxios: PokeApiAxiosAdapter = new PokeApiAxiosAdapter();
const pokeApiFetchAdapter: PokeApiFetchAdapter = new PokeApiFetchAdapter();

export const charmander: Pokemon = new Pokemon(4, "Charmander", pokeApiAxios);
export const venusaur: Pokemon = new Pokemon(
  3,
  "Venusaur",
  pokeApiFetchAdapter
);

charmander.getMoves();

venusaur.getMoves();
