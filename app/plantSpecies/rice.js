import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'

export default function rice() {

    const navigation = useNavigation();

    useEffect(()=> {
      navigation.setOptions({
        headerShows: true,
        headerTransparent: true,
        headerTitle: 'Kỹ thuật trồng Lúa nước',
      })
    }, []);

  return (
    <View>
      <Text>rice</Text>
    </View>
  )
}