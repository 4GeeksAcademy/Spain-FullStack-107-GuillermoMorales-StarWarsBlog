import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export function VehicleDetails() {
  const { uid } = useParams();
  const { store } = useGlobalReducer();
  const vehicle = store.vehicles.find(v => String(v.uid) === uid);

  if (!vehicle) return <p>No se encontró el vehículo.</p>;

  return (
    <div>
      <h2>{vehicle.name}</h2>
      <p><strong>Modelo:</strong> {vehicle.model}</p>
      <p><strong>Clase:</strong> {vehicle.vehicle_class}</p>
      <p><strong>Capacidad:</strong> {vehicle.cargo_capacity}</p>
      {/* Agrega más detalles si lo deseas */}
    </div>
  );
}