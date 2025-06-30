import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export function CharacterDetails() {
  const { uid } = useParams();
  const { store } = useGlobalReducer();
  const character = store.characters.find(c => String(c.uid) === uid);

  if (!character) return <p>No se encontró el personaje.</p>;

  return (
    <div>
      <h2>{character.name}</h2>
      <p><strong>Género:</strong> {character.gender}</p>
      <p><strong>Color de pelo:</strong> {character.hair_color}</p>
      <p><strong>Color de ojos:</strong> {character.eye_color}</p>
      {/* Agrega más detalles si lo deseas */}
    </div>
  );
}