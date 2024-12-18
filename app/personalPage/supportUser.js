import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import {Colors} from './../../constants/Colors'
export default function SupportUser() {

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(()=> {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Trợ giúp & hỗ trợ',
    })
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chúng tôi có thể giúp gì cho bạn?</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={()=>router.push('centreService/ContactSupportPage')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Liên hệ hỗ trợ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={()=>router.push('centreService/PrivacyPolicyPage')}>
        <Text style={styles.buttonText}>Chính sách bảo mật</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: Colors.Blue,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});