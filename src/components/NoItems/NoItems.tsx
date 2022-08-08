import { StyleSheet, Text, View } from 'react-native';

export default function NoItems() {
  return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>Постов пока нет...</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginVertical: 10,
    fontFamily: 'open-sans-regular',
    fontSize: 18,
    textAlign: 'center'
  }
})
