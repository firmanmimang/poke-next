import Link from "next/link"
import { Badge } from "./ui/badge"
import { PokemonImage } from "./pokemon-image"

interface PokemonCardProps {
    name: string
    image: string,
    id?: number,
    types?: any[],
    innerRef?: (node ?: Element | null | undefined) => void
}

// <PokemonCard name="pikachu" />

export function PokemonCard({ name, id, types = [], image, innerRef } : PokemonCardProps) {
    return (
        <Link
          ref={innerRef}
          href={`${name}`}
          className="p-3 md:p-4 min-h-32 lg:min-h-52 relative m-3 transition-colors border border-transparent rounded-lg group dark:border-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          key={name + "Card"}
        >
          <h2 className={`lg:text-2xl text-lg truncate font-semibold text-start`}>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
          <ul className="flex lg:w-2/4 w-full flex-wrap mt-1 gap-1">
            {types.map((type:any, index:any) => 
            <>
              <li key={index}>
                <Badge className="max-w-max rounded-full text-[.5rem] lg:text-sm capitalize font-semibold" variant="outline">{type.type?.name}</Badge>
              </li>
            </>
            )}
          </ul>
          <div className="lg:h-52 h-28 w-full md:w-auto flex items-center justify-center md:block aspect-square z-10 md:absolute relative top-0 right-0">
            <PokemonImage
              image={image}
              name={name}
              className="lg:h-52 h-10 aspect-square"
            />
          </div>
        </Link>
    )
}