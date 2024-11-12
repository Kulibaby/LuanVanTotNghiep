import { View, Text } from 'react-native'
import React from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/FirebaseConfig'
import { useRouter } from 'expo-router';

export default function SplashScreen() {
    
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          router.replace('/HomeScreen');
        } else {
          router.replace('/auth/sign-in');
        }
      });
    
      return unsubscribe;
    }, []);

  return (
    <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        }}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Đang tải...%</Text>
    </View>
  )
}