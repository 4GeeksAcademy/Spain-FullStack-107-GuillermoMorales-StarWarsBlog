import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import CardList from "../components/CardList.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  // Estados de carga y error para cada recurso
  const [loadingCharacters, setLoadingCharacters] = useState(false);
  const [errorCharacters, setErrorCharacters] = useState(null);

  const [loadingPlanets, setLoadingPlanets] = useState(false);
  const [errorPlanets, setErrorPlanets] = useState(null);

  const [loadingVehicles, setLoadingVehicles] = useState(false);
  const [errorVehicles, setErrorVehicles] = useState(null);

  useEffect(() => {
    setLoadingCharacters(true);
    setErrorCharacters(null);

    fetch("https://www.swapi.tech/api/people")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar personajes");
        return response.json();
      })
      .then((data) => {
        if (!data.results) throw new Error("No se encontraron personajes");

        const fetchDetails = data.results.map((character) =>
          fetch(character.url)
            .then((res) => {
              if (!res.ok) throw new Error("Error al cargar detalle personaje");
              return res.json();
            })
            .then((detail) => ({
              uid: character.uid,
              name: character.name,
              ...detail.result.properties,
            }))
        );

        Promise.all(fetchDetails)
          .then((charactersDetailed) => {
            dispatch({ type: "setCharacters", payload: charactersDetailed });
            setLoadingCharacters(false);
          })
          .catch((e) => {
            setErrorCharacters(e.message);
            setLoadingCharacters(false);
          });
      })
      .catch((e) => {
        setErrorCharacters(e.message);
        setLoadingCharacters(false);
      });
  }, []);

  useEffect(() => {
    setLoadingPlanets(true);
    setErrorPlanets(null);

    fetch("https://www.swapi.tech/api/planets")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar planetas");
        return response.json();
      })
      .then((data) => {
        if (!data.results) throw new Error("No se encontraron planetas");

        const fetchDetails = data.results.map((planet) =>
          fetch(planet.url)
            .then((res) => {
              if (!res.ok) throw new Error("Error al cargar detalle planeta");
              return res.json();
            })
            .then((detail) => ({
              uid: planet.uid,
              name: planet.name,
              ...detail.result.properties,
            }))
        );

        Promise.all(fetchDetails)
          .then((planetsDetailed) => {
            dispatch({ type: "setPlanets", payload: planetsDetailed });
            setLoadingPlanets(false);
          })
          .catch((e) => {
            setErrorPlanets(e.message);
            setLoadingPlanets(false);
          });
      })
      .catch((e) => {
        setErrorPlanets(e.message);
        setLoadingPlanets(false);
      });
  }, []);

  useEffect(() => {
    setLoadingVehicles(true);
    setErrorVehicles(null);

    fetch("https://www.swapi.tech/api/vehicles")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar vehículos");
        return response.json();
      })
      .then((data) => {
        if (!data.results) throw new Error("No se encontraron vehículos");

        const fetchDetails = data.results.map((vehicle) =>
          fetch(vehicle.url)
            .then((res) => {
              if (!res.ok) throw new Error("Error al cargar detalle vehículo");
              return res.json();
            })
            .then((detail) => ({
              uid: vehicle.uid,
              name: vehicle.name,
              ...detail.result.properties,
            }))
        );

        Promise.all(fetchDetails)
          .then((vehiclesDetailed) => {
            dispatch({ type: "setVehicles", payload: vehiclesDetailed });
            setLoadingVehicles(false);
          })
          .catch((e) => {
            setErrorVehicles(e.message);
            setLoadingVehicles(false);
          });
      })
      .catch((e) => {
        setErrorVehicles(e.message);
        setLoadingVehicles(false);
      });
  }, []);

  const characters = Array.isArray(store.characters) ? store.characters : [];
  const planets = Array.isArray(store.planets) ? store.planets : [];
  const vehicles = Array.isArray(store.vehicles) ? store.vehicles : [];

  return (
    <>
      <div className="text-center mt-5">
        <h1>Lista de Star Wars</h1>
      </div>

      {loadingCharacters ? (
        <p>Cargando personajes...</p>
      ) : errorCharacters ? (
        <p style={{ color: "red" }}>Error: {errorCharacters}</p>
      ) : (
        <CardList
          title="Personajes"
          items={characters}
          type="characters"
          useFavorites={true}
          showLearnMore={true}
        />
      )}

      {loadingPlanets ? (
        <p>Cargando planetas...</p>
      ) : errorPlanets ? (
        <p style={{ color: "red" }}>Error: {errorPlanets}</p>
      ) : (
        <CardList title="Planetas" items={planets} type="planets" />
      )}

      {loadingVehicles ? (
        <p>Cargando vehículos...</p>
      ) : errorVehicles ? (
        <p style={{ color: "red" }}>Error: {errorVehicles}</p>
      ) : (
        <CardList title="Vehículos" items={vehicles} type="vehicles" />
      )}

      
    </>
  );
};
