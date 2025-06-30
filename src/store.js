export const initialStore = () => {
  return {
    characters: [],
    planets: [],
    vehicles: []
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'setCharacters':
      return {
        ...store,
        characters: action.payload
      };

    case 'setPlanets':
      return {
        ...store,
        planets: action.payload
      };

    case 'setVehicles':
      return {
        ...store,
        vehicles: action.payload
      };


    case 'add'

    default:
      throw Error('Unknown action.');
  }
}