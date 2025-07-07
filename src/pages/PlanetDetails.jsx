import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export function PlanetDetails() {
  const { uid } = useParams();
  const { store } = useGlobalReducer();
  const planet = store.planets.find(p => String(p.uid) === uid);

  if (!planet) return <p>No se encontró el planeta.</p>;

  return (
    <div className="d-flex align-items-center flex-column">
      <h2 className="fs-2 text-decoration-underline text-success">{planet.name}</h2>
      <div className="d-flex text-start w-75 p-3 bg-light rounded shadow mb-3 justify-content-between mt-5 ">
        <p><strong>Clima:</strong> {planet.climate} <i class="fa-solid fa-cloud-bolt"></i></p>
        <p><strong>Terreno:</strong> {planet.terrain} <i class="fa-solid fa-mountain-sun"></i></p>
        <p><strong>Población:</strong> {planet.population} <i class="fa-solid fa-person-arrow-up-from-line"></i></p>
        <p><strong>Gravedad:</strong> {planet.gravity} <i class="fa-solid fa-globe"></i></p>
        <p><strong>Periodo de rotación:</strong> {planet.rotation_period} horas <i class="fa-solid fa-rotate"></i></p>
        <p><strong>Periodo orbital:</strong> {planet.orbital_period} días <i class="fa-solid fa-satellite"></i></p>
        <p><strong>Diámetro:</strong> {planet.diameter} km <i class="fa-regular fa-circle"></i></p>
      </div>
    </div>
  );
}