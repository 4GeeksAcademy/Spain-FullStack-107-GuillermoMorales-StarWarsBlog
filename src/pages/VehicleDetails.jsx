import React from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export function VehicleDetails() {
  const { uid } = useParams();
  const { store } = useGlobalReducer();
  const vehicle = store.vehicles.find(v => String(v.uid) === uid);

  if (!vehicle) return <p>No se encontró el vehículo.</p>;

  return (
    <div className="d-flex align-items-center flex-column">
      <h2 className="fs-2 text-decoration-underline text-danger">{vehicle.name}</h2>
      <div className="d-flex text-start w-75 p-3 bg-light rounded shadow mb-3 justify-content-between mt-5 ">
      <p><strong>Modelo:</strong> {vehicle.model} <i class="fa-solid fa-car"></i></p>
      <p><strong>Clase:</strong> {vehicle.vehicle_class} <i class="fa-solid fa-horse"></i></p>
      <p><strong>Capacidad:</strong> {vehicle.cargo_capacity} <i class="fa-solid fa-gauge-simple-high"></i></p>
      <p><strong>Velocidad máxima:</strong> {vehicle.max_atmosphering_speed} km/h <i class="fa-solid fa-gauge-simple-high"></i></p>
      <p><strong>Fabricante:</strong> {vehicle.manufacturer} <i class="fa-solid fa-wrench"></i></p>
      <p><strong>Pasajeros:</strong> {vehicle.passengers} <i class="fa-regular fa-face-smile"></i></p>
      <p><strong>Coste:</strong> {vehicle.cost_in_credits} créditos <i class="fa-solid fa-cash-register"></i></p>
      </div>
    </div>
  );
}