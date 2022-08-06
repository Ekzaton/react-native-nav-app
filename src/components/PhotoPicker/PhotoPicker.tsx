import { useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';

export default function PhotoPicker() {
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = () => {};

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
