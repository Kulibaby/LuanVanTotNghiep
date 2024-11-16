import { Stack } from "expo-router";
import {useFonts} from 'expo-font'
import { useEffect } from "react";
import SplashScreen from 'expo-splash-screen'


export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit-regular': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./../assets/fonts/Outfit-Bold.ttf'),
  })

  useEffect(() => {
    async function handle () {
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); 
      } else {
        SplashScreen.preventAutoHideAsync();
        return;
      }
    }
    handle();
  },[fontsLoaded]);

  // if (!fontsLoaded) {
  //   SplashScreen.preventAutoHideAsync();
  //   return null;
  // }

  return (
    <Stack>
      {/* HomeScreen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* (tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
