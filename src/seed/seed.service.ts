import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  // private readonly axios: AxiosInstance = axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  async executeSeed() {
    await this.pokemonModel.deleteMany(); // delete * from pokemons

    const data = await this.http.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=250',
    );

    // 1 Approach
    // data.results.forEach(async ({ name, url }) => {
    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2];
    //   await this.pokemonModel.create({ name, no });
    // });

    // 2 Approach
    // const insertPromisesArray = [];

    // data.results.forEach(({ name, url }) => {
    //   const segments = url.split('/');
    //   const no = +segments[segments.length - 2];
    //   insertPromisesArray.push(this.pokemonModel.create({ name, no }));
    // });
    // Promise.all(insertPromisesArray);

    const pokemonsToInsert: CreatePokemonDto[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];
      pokemonsToInsert.push({ name, no });
    });

    await this.pokemonModel.insertMany(pokemonsToInsert);

    return 'Seed executed';
  }
}
