import { useEffect, useState } from 'react';

import PlacesList from '../components/places/PlacesList';
import { useIsFocused } from '@react-navigation/native';

function AllPlaces({ route }) {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      setPlaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={places} />;
}

export default AllPlaces;
