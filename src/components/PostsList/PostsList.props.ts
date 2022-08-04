import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Post } from '../../types/common';

export type PostsListProps = {
  data: Post[];
  navigation: StackNavigationProp<ParamListBase>;
}
