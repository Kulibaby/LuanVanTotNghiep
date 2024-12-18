import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import {Colors} from './../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ContactSupportPage() {

    const navigation = useNavigation();
    const router = useRouter();
    
    useEffect(()=>{
        navigation.setOptions({
          headerShown: false
        })
        }, [])

  return (
    <View style={styles.container}>
         <TouchableOpacity 
            style={styles.icon}
            onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={{
            marginTop: '50%',
        }}>
            <Text style={styles.title}>Liên hệ hỗ trợ</Text>
            <Text style={styles.infoText}>
                Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại bên dưới:
            </Text>
            <Text style={styles.infoText}>Email: nmtuan010202@gmail.com</Text>
            <Text style={styles.infoText}>Phone: 0369739792</Text>
        </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: Colors.WHITE,
    },
    title: {
      fontSize: 24,
      fontFamily: 'outfit-bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    infoText: {
      fontSize: 16,
      fontFamily: 'outfit-medium',
      textAlign: 'center',
      marginBottom: 20,
      color: Colors.PRIMARY,
    },
    icon: {
        marginTop: 10,
        padding: 5,
    },
});