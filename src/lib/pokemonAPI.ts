"use server"

import { POKEMON_API } from "./url";

// getPokemonList -> Get the first 151 pokemon 
export async function getPokemonList(limit: number | null = null, url: string | null = null)
{
    try {
        const response = await fetch(url || POKEMON_API + `pokemon?limit=${limit??20}&offset=0`);
    
        const data = await response.json();
    
        const pokeData = await Promise.all(data?.results?.map( async (item:any) =>{
            const responseItem = await fetch(item.url);
            const dataItem = await responseItem.json()
            return {
                name: dataItem.name,
                id: dataItem.id,
                types: dataItem.types,
                imageUrl: dataItem?.sprites?.front_default,
            }
        }))

        return {
            pokeData,
            nextUrl: data.next,
            previousUrl: data.previous,
        };
    } catch (error) {
        console.log(error)
        // throw new Error('Failed to fetch data')
        return {
            pokeData: [],
            nextUrl: "",
            previousUrl: "",
        }

    }
    
}

// getPokemon -> given a string "pikachu", get the information of pikachu
export async function getPokemon(name: string) {
    // pokemon/ditto
    const response = await fetch(POKEMON_API + "pokemon/" + name);
    const data = response.status === 200 ? await response.json() : {};
    return data;
}
