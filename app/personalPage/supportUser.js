import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Chúng tôi có thể giúp gì cho bạn?</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Câu hỏi thường gặp (FAQs)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Liên hệ hỗ trợ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
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
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});