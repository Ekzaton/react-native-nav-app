import { Text, View } from 'react-native';

import bootstrap from './src/bootstrap';
import useAssetsLoading from './src/hooks/useAssetsLoading';

export default function App() {
  const { appIsReady, onLayoutRootView } = useAssetsLoading(bootstrap);

  if (!appIsReady) return null

  return (
    <View onLayout={onLayoutRootView}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}
