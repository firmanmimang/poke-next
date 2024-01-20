"use client"
import { cn } from "@/lib/utils";
import Image from "next/image";

export function PokemonImage({ image, name, className, } : { image: string, name: string, className?: string }) {

    return (
        <Image
            src={image??""}
            alt={"Picture of " + name}
            priority
            fill
            style={{"objectFit": "contain"}}
            className={cn("transition-opacity opacity-0 duration-[2s]", className)}
            onLoadingComplete={(image) => image.classList.remove("opacity-0")}  
        />
    )
}