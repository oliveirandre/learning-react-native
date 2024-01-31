import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import {
  PermissionStatus,
  launchCameraAsync,
  useCameraPermissions,
} from 'expo-image-picker';

import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';
import { useState } from 'react';

function ImagePicker({ onTakeImage }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [image, setImage] = useState();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insuficient permissions',
        'You need to grant camera permissions to use this feature.'
      );

      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermissions = await verifyPermissions();

    if (!hasPermissions) return;

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet...</Text>;

  if (image) {
    imagePreview = <Image source={{ uri: image }} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton onPress={takeImageHandler} icon='camera'>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
