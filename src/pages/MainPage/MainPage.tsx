import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamsList } from '../../types/navigation';

export default function MainPage() {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

  return (
      <View style={styles.center}>
        <Text>Main Screen</Text>
        <Button title='Go to Post' onPress={() => navigation.navigate('Post', undefined)} />
      </View>
  );
}

MainPage.navigationOptions = {
  headerTitle: 'Мой блог'
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
