import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

export default function useAssetsLoading(fn: () => void) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await preventAutoHideAsync();
        await fn();
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

  return { appIsReady, onLayoutRootView };
}
