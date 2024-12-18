import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState} from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'
import { auth } from './../../configs/FirebaseConfig'
import { reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';

export default function ChangePassword() {

  const navigation = useNavigation();

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(()=> {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Đổi mật khẩu',
    })
  }, []);



  const handleChangePassword = async () => {

    const user = auth.currentUser;

    if (!password.trim() || !newPassword.trim() || !confirmNewPassword.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ mật khẩu cũ và mật khẩu mới.');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Lỗi', 'Mật khẩu mới phải có ít nhất 8 ký tự.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      ToastAndroid.show('Lỗi! Mật khẩu mới không khớp.', ToastAndroid.SHORT);
      return;
    }


    if (user) {
      try {
        // xac thuc
        const credential  = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);

        //upadte new mk
        updatePassword(user, newPassword)
        .then(() => {
          ToastAndroid.show('Mật khẩu đã được thay đổi thành công.', ToastAndroid.SHORT);
          navigation.goBack(); 
        })
        .catch((error) => {
          console.error('Lỗi đổi mật khẩu: ', error);
          Alert.alert('Lỗi', `Đổi mật khẩu thất bại: ${error.message}`);
        });
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Lỗi', 'Mật khẩu hiện tại không đúng.');
        } else {
          Alert.alert('Lỗi', `Đổi mật khẩu thất bại: ${error.message}`);
        }
      }
    }
  }


  return (
    <View style={styles.container}>
      <View style={{marginTop: 50}}>
      <Text style={styles.title}>Đổi Mật Khẩu</Text>
      <View style={styles.box}>
        <TextInput 
          style={styles.input}
          placeholder='Mật khẩu hiện tại'
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <View style={styles.box}>
        <TextInput 
          style={styles.input}
          placeholder='Mật khẩu mới'
          secureTextEntry={true}
          onChangeText={(value) => setNewPassword(value)}
        />
      </View>

      <View style={styles.box}>
        <TextInput 
          style={styles.input}
          placeholder='Nhập lại mật khẩu mới'
          secureTextEntry={true}
          onChangeText={(value) => setConfirmNewPassword(value)}
        />
      </View>

      <TouchableOpacity
          style={styles.button} onPress={handleChangePassword}> 
          <Text style={styles.textButton}>Đổi mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 30,
    marginTop: 40,
    textAlign: 'center'
  },
  box: {
    marginTop: 20,
  },
  input: {
    padding: 15,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 30,
    fontFamily: 'outfit',
    marginTop: 10
  },
  button: {
    marginTop: 30,
    marginLeft: 60,
    marginRight: 60,
  },
  textButton: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 30,
    padding: 10,
  },
});