import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { Colors } from '../constants/colors';
import OutlinedButton from '../components/ui/OutlinedButton';
import { fetchPlaceById } from '../util/database';

function PlaceDetails({ route, navigation }) {
  const [place, setPlace] = useState();

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function fetchPlaceDetails() {
      const loadedPlace = await fetchPlaceById(selectedPlaceId);
      setPlace(loadedPlace);

      navigation.setOptions({
        title: loadedPlace.title,
      });
    }

    fetchPlaceDetails();
  }, [selectedPlaceId]);

  if (!place)
    return (
      <View style={styles.fallback}>
        <Text>Loading place...</Text>
      </View>
    );

  function showOnMapHandler() {
    navigation.navigate('Map', {
      lat: place.lat,
      lng: place.lng,
    });
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <OutlinedButton icon='map' onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
