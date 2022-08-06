import { requestCameraPermissionsAsync, launchCameraAsync } from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Button, Image, StyleSheet, View } from 'react-native';

import { PhotoPickerProps } from "./PhotoPicker.props";

async function askForCameraPermissions() {
  const { status } = await requestCameraPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Ошибка', 'Нет разрешения на использование камеры');

    return false;
  }

  return true;
}

export default function PhotoPicker(props: PhotoPickerProps) {
  const { onPick } = props;

  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const permissions = await askForCameraPermissions();

    if (!permissions) return;

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
