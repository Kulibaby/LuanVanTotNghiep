import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'

export default function orange() {

    const navigation = useNavigation();

    useEffect(()=> {
        navigation.setOptions({
        headerShows: true,
        headerTransparent: true,
        headerTitle: 'Kỹ thuật trồng Cam',
    })
  }, []);

  return (
    <View>
      <Text>orange</Text>
    </View>
  )
}