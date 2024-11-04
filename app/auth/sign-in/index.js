import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { Colors } from '../../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../configs/FirebaseConfig'

export default function SignIn() {

  const router = useRouter();
  const navigation = useNavigation();

   // Ẩn tiêu đề 
   useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
    }, [])


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if(!email || !password) {
      ToastAndroid.show("Vui lòng nhập Email và Mật khẩu!!", ToastAndroid.BOTTOM);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      
      //Chuyển hướng đăng nhập thành công
      if(user) {
        ToastAndroid.show("Đăng nhập thành công!", ToastAndroid.LONG);

        //chuyển hướng
        router.replace('/HomeScreen');
      } else {
        ToastAndroid.show("Tài khoảng người dùng không tồn tại!", ToastAndroid.LONG);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode === 'auth/invalid-email') 
        {
          ToastAndroid.show("Lỗi! email không hợp lệ.", ToastAndroid.LONG);
        } else if (errorCode === 'auth/wrong-password') 
        {
          ToastAndroid.show("Lỗi! mật khẩu không chính xác.", ToastAndroid.LONG);
        } else if (errorCode === 'auth/user-not-found') 
        {
          ToastAndroid.show("Lỗi! tài khoản không tồn tại.", ToastAndroid.LONG);
        } else 
        {
          ToastAndroid.show("Lỗi! đăng nhập thất bại.", ToastAndroid.LONG);
        } 
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.pageSignIn}>
        <TouchableOpacity 
            style={styles.icon}
            onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <View style={styles.imgContainer}>
            <Image source={require('./../../../assets/images/logo_signin.png')}
                style={{
                  width: '80%',
                  marginTop: 50,
                  height: 200,
                  padding: 10,
                }}
            />
        </View>

        <View>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 30,
            textAlign: 'center',
            marginTop: 20,
          }}>Đăng Nhập</Text>
        </View>

        {/* SignIn Email */}
        <View style={{
          marginTop: 20
        }}>
          <Text style={styles.title}>Email</Text>
          <TextInput 
            style={styles.input}
            onChangeText={(value) => setEmail(value)}
            placeholder='Nhập email...'  />
        </View>
      
        {/* Password */}
        <View style={{
          marginTop: 20
        }}>
          <Text style={styles.title}>Mật khẩu</Text>
          <TextInput 
            style={styles.input}
            placeholder='Nhập mật khẩu...'  
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
          />
        </View>

        {/* Button Sign In */}
        <TouchableOpacity 
          onPress={login}
          style={styles.containerButton}
        > 
          <Text style={styles.button}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push("auth/sign-up")}
          style={styles.containerButton}
        > 
          <Text style={styles.button}>Tạo tài khoản mới?</Text> 
        </TouchableOpacity>

        <TouchableOpacity style={{
          marginTop: 25,
          marginLeft: 40,
          marginRight: 40,
        }}> 
          <Text style={styles.buttonGoogle}>Đăng nhập với Google ?</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    pageSignIn: {
      height: '100%',
      padding: 25,
      backgroundColor: Colors.WHITE
    },
    imgContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    title: {
      fontFamily: 'outfit-medium',
      fontSize: 17,
      paddingHorizontal: 10,
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
  
    },
    containerButton: {
      marginTop: 25,
      marginLeft: 60,
      marginRight: 60,
    },
    button: {
      fontSize: 20,
      fontFamily: 'outfit-bold',
      textAlign: 'center',
      color: Colors.WHITE,
      backgroundColor: Colors.PRIMARY,
      borderRadius: 30,
      padding: 10,
    },
    buttonGoogle: {
      fontSize: 20,
      fontFamily: 'outfit-bold',
      textAlign: 'center',
      borderRadius: 30,
      padding: 10,
      borderWidth: 2,
      borderColor: Colors.PRIMARY
    }
  });