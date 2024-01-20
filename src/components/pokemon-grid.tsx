"use client"
import { PokemonCard } from "./pokemon-card";
import { useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useInView } from "react-intersection-observer";
import { getPokemonList } from "@/lib/pokemonAPI";
import { usePoke } from "@/store/PokemonProvider";

interface PokemonGridProps {
    pokemonList: any,
    nextUrl?: string|null|undefined
}

export function PokemonGrid({ pokemonList, nextUrl } : PokemonGridProps)
{
    const setPoke = usePoke()(state => state.setPoke);
    const [pokemons, setPokemons] = useState(pokemonList)
    const [nextPage, setnextPage] = useState(nextUrl)

    const fetching = useRef(false);
    const {ref, inView} = useInView();
    const {ref:refLoad, inView: inViewLoad} = useInView();
    useEffect(() => {

        (async () => {
            if (!fetching.current && nextPage && (inView || inViewLoad)) {
                try {
                    fetching.current = true;
                    const {pokeData, nextUrl: url, previousUrl}: any = await getPokemonList(null, nextPage);
                    setPokemons((prev:any) => [...prev, ...pokeData])
                    setnextPage(url)
                    setPoke({pokeData: [...pokemons, ...pokeData], nextUrl: url, previousUrl })
                } catch(error){
                    console.log(error)
                } finally {
                    setTimeout(() => fetching.current = false, 500);
                }
            }
        })()

    }, [inView, inViewLoad, nextPage, pokemons, setPoke]);

    const [ searchText, setSearchText ] = useState("");
    const searchFilter = (pokemonList: any) => {
        return pokemonList?.filter(
            (pokemon: any) => pokemon.name.toLowerCase().includes(searchText.toLowerCase())
        )
    }

    // save the filtered array of objects
    const filteredPokemonList = searchFilter(pokemons);

    return (
        <>
            <div>
                <h1 className="py-6 text-2xl text-center">Search For Your Pokemon!</h1>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="pokemonName">Pokemon Name</Label>
                    <Input 
                        type="text" 
                        value={searchText} 
                        autoComplete="off"
                        id="pokemonName"
                        placeholder="Charizard, Pikachu, etc."
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <h3 className="pt-12 pb-6 text-3xl text-center">Pokemon Collection</h3>
            </div>

            <div className="grid mb-32 grid-cols-2 text-center md:mb-0 md:grid-cols-3 md:text-left w-full">
                {filteredPokemonList?.map((pokemon : any, _index: number) => {
                    if((pokemons.length-18 === _index)){
                        return (
                            <PokemonCard innerRef={ref} name={pokemon.name} id={pokemon.id} types={pokemon.types} image={pokemon.imageUrl} key={pokemon.name + _index + "Card"}/>
                        )
                    }
                    else {
                        return (
                            <PokemonCard name={pokemon.name} id={pokemon.id} types={pokemon.types} image={pokemon.imageUrl} key={pokemon.name + _index + "Card"}/>
                        )
                    }
                })}
                <div ref={refLoad} className="col-span-full text-center mt-2 mb-5 animate-pulse">
                {fetching.current && 'Loading . . .'}
                </div>
            </div>
        </>
    )
}