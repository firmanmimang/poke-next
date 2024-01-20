"use client"
import { Pokemon } from "@/type";
import { useState, createContext, useContext } from "react";
import { create } from "zustand";

const createStore = (poke:Pokemon) =>
  create<{
    poke: Pokemon;
    setPoke: (poke: Pokemon) => void;
  }>((set) => ({
    poke,
    setPoke(poke: Pokemon) {
      set({ poke });
    }
  }))

const PokeContext = createContext<ReturnType<typeof createStore> | null>(null)

export const usePoke = () => {
  if(!PokeContext)
    throw new Error("usePoke must be used within a PokemonProvider")
  return useContext(PokeContext)!
}

const PokemonProvider = ({
  poke,
  children,
} : {
  poke: Pokemon;
  children: React.ReactNode;
}) => {
  const [store] = useState(()=>createStore(poke))
  return <PokeContext.Provider value={store}>{children}</PokeContext.Provider>
}

export default PokemonProvider;