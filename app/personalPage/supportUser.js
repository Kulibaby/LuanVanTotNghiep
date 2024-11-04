import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

export default function supportUser() {

  const navigation = useNavigation();

  useEffect(()=> {
    navigation.setOptions({
      headerShows: true,
      headerTransparent: true,
      headerTitle: 'Trợ giúp & hỗ trợ',
    })
  }, []);

  return (
    <View>
      <Text>supportUser</Text>
    </View>
  )
}