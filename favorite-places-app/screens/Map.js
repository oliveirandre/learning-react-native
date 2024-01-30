import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useCallback, useLayoutEffect, useState } from 'react';

import IconButton from '../components/ui/IconButton';

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({
      lat,
      lng,
    });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation)
      Alert.alert(
        'No location picked!',
        'You have to pick a location by tapping the map'
      );

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]); // prevents unnecessary re-renders

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='save'
          color={tintColor}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={region}
      onPress={selectLocationHandler}
      style={styles.map}
    >
      {selectedLocation && (
        <Marker
          title='Picked location'
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
