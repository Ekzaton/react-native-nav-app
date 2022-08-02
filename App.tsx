import bootstrap from './src/bootstrap';
import useAssetsLoading from './src/hooks/useAssetsLoading';
import Navigator from './src/navigation/Navigator';

export default function App() {
  const isLoadingComplete = useAssetsLoading(bootstrap);

  if (!isLoadingComplete) return null;

  return <Navigator />;
}
