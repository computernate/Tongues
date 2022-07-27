import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    Sublima: require('./assets/fonts/Sublima-ExtraBold.otf'),
  });
