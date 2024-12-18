import { View, Text, Image, StyleSheet, ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'
import { auth, db } from './../../configs/FirebaseConfig'
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function personalData() {

  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [dayOfBirth, setDayOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');

  useEffect(()=> {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Thông tin cá nhân',
    })
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData);
            setPhone(userData.phone || '');
            setDayOfBirth(userData.dayOfBirth || '');
            setAddress(userData.address || '');
            setGender(userData.gender || '');
          } else {
            console.log("Không tìm thấy thông tin người dùng trong Firestore!");
          }
        }
      } catch (error) {
        console.log("Lỗi khi lấy thông tin người dùng:", error);
      }
    };
    fetchUserData();
  }, []);

const updateUserData = async () => {
  try {
    const currentUser = auth.currentUser;
    if (currentUser) {
      await updateDoc(doc(db, "users", currentUser.uid), {
        phone,
        dayOfBirth,
        address,
        gender,
      });
      console.log("Cập nhật thông tin thành công!");
      ToastAndroid.show("Cập nhật thành công!", ToastAndroid.LONG);
    }
  } catch (error) {
    console.log("Lỗi khi lấy thông tin người dùng:", error);
    ToastAndroid.show('Cập nhật thất bại!', ToastAndroid.LONG);
  }
}


 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('./../../assets/images/avt-profile.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.user}>{user?.fullName}</Text>
      </View>

      <View style={styles.main}>

        <Text style={styles.label}>Email: {user?.email}</Text>
        

        <Text style={styles.label}>Số điện thoại:</Text>
        <TextInput style={styles.input} 
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Ngày Sinh:</Text>
        <TextInput style={styles.input} 
          value={dayOfBirth}
          onChangeText={setDayOfBirth}
        />

        <Text style={styles.label}>Giới tính:</Text>
        <TextInput style={styles.input} 
          value={gender}
          onChangeText={setGender}
        />


        <Text style={styles.label}>Địa chỉ:</Text>
        <TextInput style={styles.input} 
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity style={styles.containerButton}
          onPress={updateUserData}
        >
          <Text style={styles.button}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  user: {
    fontSize: 20,
    fontFamily: 'outfit-regular',
    textAlign: 'center',
    marginTop: 10,
  },
  main: {
    flex: 1,
    marginTop: 20,
  },
  label: {
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
    marginBottom: 20,
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
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  genderOption: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  genderSelected: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  genderText: {
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  
})