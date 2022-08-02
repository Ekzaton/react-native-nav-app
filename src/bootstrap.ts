import { loadAsync } from 'expo-font';

export default async function bootstrap() {
  await loadAsync({
    'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf')
  })
}
