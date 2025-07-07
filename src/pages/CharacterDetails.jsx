import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export function CharacterDetails() {
  const { uid } = useParams();
  const { store } = useGlobalReducer();
  const character = store.characters.find(c => String(c.uid) === uid);

  if (!character) return <p>No se encontró el personaje.</p>;

  return (
    <div className="d-flex align-items-center flex-column ">
      <h2 className="fs-2 text-decoration-underline text-primary">{character.name}</h2>
      <div className="d-flex text-start w-75 p-3 bg-light rounded shadow mb-3 justify-content-between mt-5 ">
        <p><strong>Género:</strong> {character.gender} <i class="fa-solid fa-venus-mars"></i></p>
        <p><strong>Color de pelo:</strong> {character.hair_color} <i class="fa-solid fa-scissors"></i></p>
        <p><strong>Color de ojos:</strong> {character.eye_color} <i class="fa-solid fa-eye"></i></p>
        <p><strong>Altura:</strong> {character.height} cm <i class="fa-solid fa-arrows-up-down"></i></p>
        <p><strong>Peso:</strong> {character.mass} kg <i class="fa-solid fa-dumbbell"></i></p>
        <p><strong>Año de nacimiento:</strong> {character.birth_year} <i class="fa-solid fa-baby"></i></p>
        <p><strong>Color de piel:</strong> {character.skin_color} <i class="fa-solid fa-person-rays"></i></p>
      </div>
    </div>
  );
}