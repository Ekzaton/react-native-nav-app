import { useState } from 'react';
import { Button, Image, Keyboard, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Theme } from '../../constants/theme';
import { useAppDispatch } from '../../store';
import { addPost } from '../../store/slices/posts';
import { StackParamsList } from '../../types/navigation';

export default function CreatePage() {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

  const [text, setText] = useState('');

  const dispatch = useAppDispatch();

  const img = 'https://cdn.londonandpartners.com/visit/general-london/areas/river/76709-640x360-houses-of-parliament-and-london-eye-on-thames-from-above-640.jpg';

  const createPostHandler = () => {
    const post = {
      id: Date.now().toString(),
      date: new Date().toJSON(),
      img,
      text,
      booked: false
    }
    dispatch(addPost(post));
    navigation.navigate('Main');
  };

  return (
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.wrapper}>
            <Image
                style={{ width: '100%', height: 200, marginBottom: 10 }}
                source={{ uri: img }}
            />
            <TextInput
                style={styles.textarea}
                placeholder='Введите текст поста...'
                value={text}
                onChangeText={setText}
                multiline
            />
            <Button
                title='Создать пост'
                color={Theme.MAIN_COLOR}
                onPress={createPostHandler}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  textarea: {
    marginBottom: 10,
    padding: 10
  }
})
