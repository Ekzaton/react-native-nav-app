import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import PostsList from '../../components/PostsList/PostsList';
import Loader from '../../components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '../../store';
import { loadPosts } from '../../store/slices/posts';
import { StackParamsList } from '../../types/navigation';

export default function MainPage() {
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

  const dispatch = useAppDispatch();
  const postsAll = useAppSelector(state => state.posts.postsAll);
  const loading = useAppSelector(state => state.posts.loading);

  useEffect(() => {
    dispatch(loadPosts());
  }, [])

  if (loading) return <Loader />

  return <PostsList posts={postsAll} navigation={navigation} />;
}
