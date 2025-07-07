import { PlanetDetails } from "./pages/PlanetDetails";

// Estado inicial de la tienda global
export const initialStore = () => ({
  characters: [],
  planets: [],
  vehicles: [],
  favorites: [],
  todos: []
});

export default function storeReducer(store, action = {}) {
  const { type, payload } = action;

  switch (type) {

    case 'setTodos':
      return { ...store, todos: payload };


    case 'setCharacters':
      return { ...store, characters: payload };

    case 'setPlanets':
      return { ...store, planets: payload };

    case 'setVehicles':
      return { ...store, vehicles: payload };

    case 'addToFavorites': {
      const { uid, name, type } = payload;
      const alreadyExists = store.favorites.some(fav => fav.uid === uid && fav.type === type);
      if (alreadyExists) return store;
      return {
        ...store,
        favorites: [...store.favorites, { uid, name, type }]
      };
    }

    case 'removeFromFavorites':
      return {
        ...store,
        favorites: store.favorites.filter(
          fav => !(fav.uid === payload.uid && fav.type === payload.type)
        )
      };

    default:
      throw new Error('Unknown action type: ');
  }
}
