import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useAssetsLoading(fn: () => void) {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await preventAutoHideAsync();
        await fn();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
        await hideAsync();
      }
    }

    prepare();
  }, []);

  return isLoadingComplete;
}
