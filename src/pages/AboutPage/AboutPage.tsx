import { StyleSheet, Text, View } from 'react-native';

export default function AboutPage() {
  return (
      <View style={styles.center}>
        <Text>Это лучшее приложение для личных заметок</Text>
        <Text>Весрия: <Text style={styles.version}>1.0.0</Text></Text>
      </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  version: {
    fontFamily: 'open-sans-bold'
  }
})
