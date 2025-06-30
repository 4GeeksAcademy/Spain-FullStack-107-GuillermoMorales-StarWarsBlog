import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const CardList = ({ title, items, type, useFavorites = false, showLearnMore = false }) => {
  const { store, dispatch } = useGlobalReducer();

  // Funciones para favoritos, solo si useFavorites=true
  const isFavorite = (uid) => store.favorites.some(fav => fav.uid === uid);

  const toggleFavorite = (item) => {
  if (isFavorite(item.uid)) {
    dispatch({ type: "removeFromFavorites", payload: { uid: item.uid, type } });
  } else {
    dispatch({ type: "addToFavorites", payload: { uid: item.uid, name: item.name, type } });
  }
};

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div>
        <h2 className="mt-5 text-danger text-decoration-underline">{title} :</h2>
        <p>No hay datos disponibles.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mt-5 text-danger text-decoration-underline">{title} :</h2>
      <div className="cards-container" style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {items.map((item) => (
          <div
            key={item.uid || item.name} // uid preferido para key
            className="card"
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              width: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3><u>{item.name}</u></h3>
            {/* Renderizado específico según tipo */}
            {type === "characters" && (
              <>
                <p><strong>Género:</strong> {item.gender}</p>
                <p><strong>Color de pelo:</strong> {item.hair_color}</p>
                <p><strong>Color de ojos:</strong> {item.eye_color}</p>
              </>
            )}
            {type === "planets" && (
              <>
                <p><strong>Clima:</strong> {item.climate}</p>
                <p><strong>Terreno:</strong> {item.terrain}</p>
                <p><strong>Población:</strong> {item.population}</p>
              </>
            )}
            {type === "vehicles" && (
              <>
                <p><strong>Modelo:</strong> {item.model}</p>
                <p><strong>Clase:</strong> {item.vehicle_class}</p>
                <p><strong>Capacidad:</strong> {item.cargo_capacity}</p>
              </>
            )}
            <div className="mt-auto d-flex justify-content-between align-items-center">
              {showLearnMore && (
                <Link
                  to={
                    type === "characters"
                      ? `/character-details/${item.uid}`
                      : type === "planets"
                        ? `/planet-details/${item.uid}`
                        : type === "vehicles"
                          ? `/vehicle-details/${item.uid}`
                          : "#"
                  }
                  className="btn btn-primary"
                >
                  Ver más detalles...
                </Link>
              )}
              {useFavorites && type === "characters" && (
                <button
                  className="btn btn-light btn-favorite"
                  onClick={() => toggleFavorite(item)}
                  aria-label={isFavorite(item.uid) ? "Quitar de favoritos" : "Agregar a favoritos"}
                >
                  <i
                    className={`fa-heart ${isFavorite(item.uid) ? "fa-solid" : "fa-regular"}`}
                    style={{ color: isFavorite(item.uid) ? "yellow" : "black" }}
                  />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
