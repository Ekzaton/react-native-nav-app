import { loadAsync } from 'expo-font';

import API from './helpers/API'

export default async function bootstrap() {
  try {
    await loadAsync({
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf')
    })
    await API.init();
    console.log('Starting SQLite DB...');
  } catch(e) {
    console.log(e);
  }
}
