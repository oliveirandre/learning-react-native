import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  useForegroundPermissions,
} from 'expo-location';
import { getMapPreview, translateAddress } from '../../util/location';
import { useEffect, useState } from 'react';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

function LocationPicker({ onPickLocation }) {
  const [location, setLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };

      setLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (location) {
        const address = await translateAddress(location.lat, location.lng);
        onPickLocation({ ...location, address: address });
      }
    }

    handleLocation();
  }, [location, onPickLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insuficient permissions',
        'You need to grant location permissions to use this feature.'
      );

      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) return;

    const userLocation = await getCurrentPositionAsync();

    setLocation({
      lat: userLocation.coords.latitude,
      lng: userLocation.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate('Map');
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  if (location)
    locationPreview = (
      <Image
        source={{ uri: getMapPreview(location.lat, location.lng) }}
        style={styles.mapPreviewImage}
      />
    );

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon='location' onPress={getLocationHandler}>
          Locate me
        </OutlinedButton>
        <OutlinedButton icon='map' onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
  },
});
