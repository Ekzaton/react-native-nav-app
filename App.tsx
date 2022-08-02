import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import bootstrap from './src/bootstrap';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await preventAutoHideAsync();
        await bootstrap();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await hideAsync();
  }, [appIsReady])

  if (!appIsReady) return null

  return (
    <View onLayout={onLayoutRootView}>
      <Text>Open up App.tsx to start working on your app!</Text>
    </View>
  );
}
