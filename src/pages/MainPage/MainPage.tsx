import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import PostsList from '../../components/PostsList/PostsList';
import { DATA } from '../../data';
import { MainStackParamsList } from '../../types/navigation';

export default function MainPage() {
  const navigation = useNavigation<StackNavigationProp<MainStackParamsList>>();

  return <PostsList data={DATA} navigation={navigation} />;
}
