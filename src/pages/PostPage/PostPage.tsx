import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamsList } from '../../types/navigation';

export default function PostPage() {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();
  const { params } = useRoute<RouteProp<StackParamsList, 'Post'>>();

  return (
      <View style={styles.center}>
        <Text>{`Пост №${params.id} от ${params.date}`}</Text>
        <Button title='Go Back' onPress={() => navigation.goBack()} />
      </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
