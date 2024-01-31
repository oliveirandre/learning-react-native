import { useEffect, useState } from 'react';

import PlacesList from '../components/places/PlacesList';
import { fetchPlaces } from '../util/database';
import { useIsFocused } from '@react-navigation/native';

function AllPlaces() {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const loadedPlaces = await fetchPlaces();
      setPlaces(loadedPlaces);
    }

    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={places} />;
}

export default AllPlaces;
