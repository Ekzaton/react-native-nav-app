import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
  PermissionResponse
} from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, View } from 'react-native';

import { PhotoPickerProps } from './PhotoPicker.props';

async function askForPermissions(fn: () => Promise<PermissionResponse>) {
  const { status } = await fn();

  if (status !== 'granted') {
    Alert.alert('Ошибка', 'Нет разрешения на использование!');

    return false;
  }

  return true;
}

export default function PhotoPicker(props: PhotoPickerProps) {
  const { onPick } = props;

  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const cameraPermissions = await askForPermissions(requestCameraPermissionsAsync);
    const mediaLibraryPermissions = await askForPermissions(requestMediaLibraryPermissionsAsync);

    if (!cameraPermissions || !mediaLibraryPermissions) return;

    const img = await launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9]
    });

    if (!img.cancelled) {
      setImage(img.uri);
      onPick(img.uri);
    }
  };

  return (
      <View style={styles.wrapper}>
        <Button title='Сделать фото' onPress={takePhoto}/>
        {image && <Image style={styles.image} source={{ uri: image }} />}
      </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10
  }
})
