import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamsList } from '../../types/navigation';

export default function PostPage() {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

  return (
      <View style={styles.center}>
        <Text>Post Screen</Text>
        <Button title='Go Back' onPress={() => navigation.goBack()} />
      </View>
  );
}

PostPage.options = {
  headerTitle: 'Пост №42',
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
