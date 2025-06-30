import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export function PlanetDetails() {
  const { uid } = useParams();
  const { store } = useGlobalReducer();
  const planet = store.planets.find(p => String(p.uid) === uid);

  if (!planet) return <p>No se encontró el planeta.</p>;

  return (
    <div>
      <h2>{planet.name}</h2>
      <p><strong>Clima:</strong> {planet.climate}</p>
      <p><strong>Terreno:</strong> {planet.terrain}</p>
      <p><strong>Población:</strong> {planet.population}</p>
      {/* Agrega más detalles si lo deseas */}
    </div>
  );
}