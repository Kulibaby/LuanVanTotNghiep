import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth, db } from './../../../configs/FirebaseConfig'
import { doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const router = useRouter();
  const navigation = useNavigation();

   // Ẩn tiêu đề 
   useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
    }, [])

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const createAccount = () => {
    //khâu Xử lý
    if (!fullName || !email || !password || !confirmPassword) {
      ToastAndroid.show("Vui lòng điền đầy đủ thông tin!", ToastAndroid.LONG);
      return;
    }

    //Test Email
    const testEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (!testEmail.test(email)) {
      ToastAndroid.show("Email không hợp lệ!", ToastAndroid.LONG);
      return;
    }

    if (confirmPassword !== password) {
      ToastAndroid.show("Mật khẩu không trùng khớp!", ToastAndroid.LONG);
      return;
    }

    if (password.length < 8 && confirmPassword.length < 8) {
      ToastAndroid.show("Mật khẩu cần ít nhất 8 ký tự!", ToastAndroid.LONG);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Lưu thông tin người dùng
      return setDoc(doc(db, 'users', user.uid), {
        fullName: fullName,
        email: email,
      })
    })
    .then(() => {
      console.log("Thông tin người dùng được lưu thành công!");
    // Điều hướng đến màn hình đăng nhập
      router.replace("auth/sign-in");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage, errorCode);
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.pageSignUp}>
        <TouchableOpacity style={styles.icon}
            onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <View>
            <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 30,
            marginTop: 40,
            textAlign: 'center'
            }}>
                Đăng Ký
            </Text>
        </View>

        <View style={styles.container}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 17,
            paddingHorizontal: 10,
          }}>Nhập họ và tên</Text>
          <TextInput 
            style={styles.input}
            placeholder='Nhập họ và tên...'
            onChangeText={(value) => setFullName(value)}
          />
        </View>
        <View style={styles.container}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 17,
            paddingHorizontal: 10,
          }}>Email</Text>
          <TextInput 
          style={styles.input}
          placeholder='Nhập email...'
          onChangeText={(value) => setEmail(value)}
          />
        </View>
      
        {/* Password */}
        <View style={styles.container}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 17,
            paddingHorizontal: 10,
          }}>Mật khẩu</Text>
          <TextInput 
            style={styles.input}
            placeholder='Nhập mật khẩu...'  
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
        </View>

        <View style={styles.container}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 17,
            paddingHorizontal: 10,
          }}>Nhập lại mật khẩu</Text>
          <TextInput 
            style={styles.input}
            placeholder='Nhập lại mật khẩu...'  
            secureTextEntry={true}
            onChangeText={(value) => setConfirmPassword(value)}
          />
        </View>
    
        <TouchableOpacity
          onPress={createAccount}
          style={{
            marginTop: 30,
            marginLeft: 60,
            marginRight: 60,
        }}> 
          <Text style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
            textAlign: 'center',
            color: Colors.WHITE,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 30,
            padding: 10,
          }}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={()=>router.replace('auth/sign-in')}
          style={{
            marginTop: 30,
            marginLeft: 60,
            marginRight: 60,
        }}> 
          <Text style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
            textAlign: 'center',
            color: Colors.WHITE,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 30,
            padding: 10,
          }}>Quay lại đăng nhập</Text>
        </TouchableOpacity> 
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    pageSignUp: {
        height: '100%',
        backgroundColor: Colors.WHITE,
        padding: 20
    },
    container: {
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
    icon: {
      marginTop: 10,
      padding: 5
    }
  })
