import { StyleSheet, Text, View } from 'react-native';

export default function AboutPage() {
  return (
      <View style={styles.center}>
        <Text style={styles.bold}>Лучшее приложение для личных заметок!</Text>
        <Text>Верcия: <Text style={styles.bold}>1.0.0</Text></Text>
      </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bold: {
    fontFamily: 'open-sans-bold'
  }
})
