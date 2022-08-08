import { useRef, useState } from 'react';
import { Button, Keyboard, ScrollView, StyleSheet, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import PhotoPicker from '../../components/PhotoPicker/PhotoPicker';
import { Theme } from '../../constants/theme';
import { useAppDispatch } from '../../store';
import { addPost } from '../../store/slices/posts';
import { StackParamsList } from '../../types/navigation';

export default function CreatePage() {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

  const dispatch = useAppDispatch();

  const [text, setText] = useState('');

  const imgRef = useRef('');

  const photoPickHandler = (uri: string) => imgRef.current = uri;

  const createPostHandler = () => {
    const post = {
      text,
      date: new Date().toJSON(),
      booked: false,
      img: imgRef.current,
    }
    dispatch(addPost(post));
    navigation.navigate('Main');
  };

  return (
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.wrapper}>
            <PhotoPicker onPick={photoPickHandler} />
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
