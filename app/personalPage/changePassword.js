import { View, Text } from 'react-native'
import React, { useEffect} from 'react'
import { useNavigation } from 'expo-router'

export default function changePassword() {

  const navigation = useNavigation();

  useEffect(()=> {
    navigation.setOptions({
      headerShows: true,
      headerTransparent: true,
      headerTitle: 'Đổi mật khẩu',
    })
  }, []);

  return (
    <View>
      <Text>changePassword</Text>
    </View>
  )
}