import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();

	// Obtener personajes con detalles
	useEffect(() => {
		fetch("https://www.swapi.tech/api/people")
			.then((response) => response.json())
			.then((data) => {
				const fetchDetails = data.results.map((character) =>
					fetch(character.url)
						.then((res) => res.json())
						.then((detail) => detail.result.properties)
				);
				Promise.all(fetchDetails).then((charactersDetailed) => {
					dispatch({ type: "setCharacters", payload: charactersDetailed });
				});
			})
			.catch((error) => console.error("Error fetching characters:", error));
	}, [dispatch]);

	// Obtener planetas con detalles
	useEffect(() => {
		fetch("https://www.swapi.tech/api/planets")
			.then((response) => response.json())
			.then((data) => {
				const fetchDetails = data.results.map((planet) =>
					fetch(planet.url)
						.then((res) => res.json())
						.then((detail) => detail.result.properties)
				);
				Promise.all(fetchDetails).then((planetsDetailed) => {
					dispatch({ type: "setPlanets", payload: planetsDetailed });
				});
			})
			.catch((error) => console.error("Error fetching planets:", error));
	}, [dispatch]);

	// Obtener vehículos con detalles
	useEffect(() => {
		fetch("https://www.swapi.tech/api/vehicles")
			.then((response) => response.json())
			.then((data) => {
				const fetchDetails = data.results.map((vehicle) =>
					fetch(vehicle.url)
						.then((res) => res.json())
						.then((detail) => detail.result.properties)
				);
				Promise.all(fetchDetails).then((vehiclesDetailed) => {
					dispatch({ type: "setVehicles", payload: vehiclesDetailed });
				});
			})
			.catch((error) => console.error("Error fetching vehicles:", error));
	}, [dispatch]);

	return (
		<>
			<div className="text-center mt-5">
				<h1>Lista de Star Wars</h1>
			</div>

			<div>
				<h2 className="mt-5 text-danger text-decoration-underline">Personajes :</h2>
				{store.characters.length === 0 ? (
					<p>Cargando personajes...</p>
				) : (
					<div className="cards-container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
						{store.characters.map((character, index) => (
							<div
								key={index}
								className="card"
								style={{
									border: "1px solid #ccc",
									borderRadius: "8px",
									padding: "1rem",
									width: "200px",
								}}
							>
								<h3><u>{character.name}</u></h3>
								<p><strong>Género:</strong> {character.gender}</p>
								<p><strong>Color de pelo:</strong> {character.hair_color}</p>
								<p><strong>Color de ojos:</strong> {character.eye_color}</p>
								<div className="mt-auto">
									<button className="btn btn-primary">Ver más detalles...</button>
									
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<div>
				<h2 className="mt-5 text-danger text-decoration-underline">Planetas :</h2>
				{store.planets.length === 0 ? (
					<p>Cargando planetas...</p>
				) : (
					<div className="cards-container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
						{store.planets.map((planet, index) => (
							<div
								key={index}
								className="card"
								style={{
									border: "1px solid #ccc",
									borderRadius: "8px",
									padding: "1rem",
									width: "200px",
								}}
							>
								<h3><u>{planet.name}</u></h3>
								<p><strong>Clima:</strong> {planet.climate}</p>
								<p><strong>Terreno:</strong> {planet.terrain}</p>
								<p><strong>Población:</strong> {planet.population}</p>
								<div className="mt-auto">
									<button className="btn btn-primary">Ver más detalles...</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>

			<div>
				<h2 className="mt-5 text-danger text-decoration-underline">Vehículos :</h2>
				{store.vehicles.length === 0 ? (
					<p>Cargando vehículos...</p>
				) : (
					<div className="cards-container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
						{store.vehicles.map((vehicle, index) => (
							<div
								key={index}
								className="card"
								style={{
									border: "1px solid #ccc",
									borderRadius: "8px",
									padding: "1rem",
									width: "200px",
								}}
							>
								<h3><u>{vehicle.name}</u></h3>
								<p><strong>Modelo:</strong> {vehicle.model}</p>
								<p><strong>Clase:</strong> {vehicle.vehicle_class}</p>
								<p><strong>Capacidad:</strong> {vehicle.cargo_capacity}</p>
								<div className="mt-auto">
									<button className="btn btn-primary">Ver más detalles...</button>
									
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};