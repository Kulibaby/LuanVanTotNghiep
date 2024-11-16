import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
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
      <Text style={styles.title}>Đổi mật khẩu</Text>

<TextInput
  style={styles.input}
  placeholder="Mật khẩu cũ"


/>

<TextInput
  style={styles.input}
  placeholder="Mật khẩu mới"


/>

<TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu mới"
  
      />
        {/* {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null} */}

<TouchableOpacity style={styles.button}>
  <Text style={styles.buttonText}>Lưu thay đổi</Text>
</TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
});