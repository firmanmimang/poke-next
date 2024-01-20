"use client"
import { PokemonGrid } from '@/components/pokemon-grid'
import { usePoke } from '@/store/PokemonProvider';

export default function Home() {
  const {pokeData: pokemonList, nextUrl} = usePoke()((state) => state.poke);
  return (
      <PokemonGrid pokemonList={pokemonList} nextUrl={nextUrl}/>
  )
}
