import { Provider } from 'react-redux'

import bootstrap from './src/bootstrap';
import useAssetsLoading from './src/hooks/useAssetsLoading';
import Navigator from './src/navigation/Navigator';
import store from './src/store';

export default function App() {
  const isLoadingComplete = useAssetsLoading(bootstrap);

  if (!isLoadingComplete) return null;

  return (
      <Provider store={store}>
        <Navigator />
      </Provider>
  );
}
