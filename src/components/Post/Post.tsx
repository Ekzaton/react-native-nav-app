import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { PostProps } from './Post.props';

export default function Post(props: PostProps) {
  const { content, onOpen } = props;

  return (
      <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(content)}>
        <View style={styles.post}>
          <ImageBackground style={styles.image} source={{ uri: content.img }}>
            <View style={styles.textWrap}>
              <Text style={styles.title}>
                {new Date(content.date).toLocaleDateString()}
              </Text>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  post: {
    overflow: 'hidden',
    marginBottom: 15
  },
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  title: {
    fontFamily: 'open-sans-regular',
    color: '#FFF'
  }
})
