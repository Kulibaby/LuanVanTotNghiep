import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'

export default function personalData() {

  const navigation = useNavigation();

  useEffect(()=> {
    navigation.setOptions({
      headerShows: true,
      headerTransparent: true,
      headerTitle: 'Thông tin cá nhân',
    })
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./../../assets/images/avt-profile.jpg')}
          style={styles.avatar}
        />
      </View>

      <View style={styles.main}>
        <Text style={styles.label}>Họ và tên:</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Số điện thoại:</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Ngày Sinh:</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Địa chỉ:</Text>
        <TextInput style={styles.input} />

        <TouchableOpacity style={styles.containerButton}>
          <Text style={styles.button}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    marginTop: 50,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  main: {
    flex: 1,
    marginTop: 20,
  },
  lable: {
    fontSize: 16,
    fontFamily: 'outfit-bold',
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  containerButton: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  button: {
    fontSize: 18,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    color: Colors.WHITE,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    padding: 10,
  },
})