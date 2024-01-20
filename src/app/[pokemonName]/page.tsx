import { getPokemon, getPokemonList } from "@/lib/pokemonAPI";
import { PokemonImage } from "@/components/pokemon-image";
import { Progress } from "@/components/ui/progress";

export async function generateStaticParams() {
    const {pokeData} = await getPokemonList(1302)
    return pokeData?.map((poke: any) => ({
        pokemonName: poke.name,
    }))
}

export default async function PokemonPage({ params }: { params: { pokemonName: string } }) {
    const { pokemonName } = params;
    const pokemonObject = await getPokemon(pokemonName);
    return (
        <>
            <h1 className="pt-4 text-4xl text-bold">{pokemonName?.charAt(0).toUpperCase() + pokemonName?.slice(1)}</h1>
            <div className="m-4" style={{ position: "relative", width: '300px', height: '300px' }}>
                <PokemonImage
                    image={pokemonObject?.sprites?.other['official-artwork']?.front_default}
                    name={pokemonName}
                />
            </div>
            <h2 className="text-sm md:text-base mb-3">Weight: {pokemonObject?.weight}</h2>
            <div className="flex flex-col gap-y-4 mb-7">
                {pokemonObject?.stats?.map((statObject: any) => {
                    const statName = statObject?.stat.name;
                    const statValue = statObject?.base_stat;

                    return (
                        <div className="flex items-stretch md:w-[500px] w-screen px-2" key={statName}>
                            <h3 className="w-2/4 text-sm md:text-base">{statName}: {statValue}</h3>
                            <Progress className="w-2/4 m-auto" value={statValue} />
                        </div>
                    )
                })}
            </div>
        </>
    )

}