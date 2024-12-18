import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextComponent, ToastAndroid} from 'react-native'
import React, {useEffect, useState} from 'react'
import {  useRouter } from 'expo-router'
import { Colors } from './../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, db } from './../../configs/FirebaseConfig'
import { doc, getDoc, userData } from 'firebase/firestore';
import { signOut } from "firebase/auth";

export default function ProfileScreen() {

    const router = useRouter();
    const [user, setUser] = useState('');

    // setUser(userDoc.data());
    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                if (userDoc.exists()) {
                    setUser(userDoc.data());              
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

    const handleSignOut = async () => {
        signOut(auth).then(() => {
            router.replace('auth/sign-in')
            console.log("User Sign-out successful!");
          }).catch((error) => {
            console.log(error);
          });
    }

    const handleNavigation = (path) => {
        try {
            router.push(path);
        } catch (error) {
            console.log('Lỗi điều hướng', error);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                
                <Image
                    source={require('./../../assets/images/avt-profile.jpg')}
                    style={styles.avatar}
                />
                <Text style={styles.user}>{user?.fullName}</Text>
            </View>

            <View style={styles.main}>
                {/* Thong tin ca nhan */}
                <TouchableOpacity 
                    onPress={() => handleNavigation('personalPage/personalData')}
                    style={styles.editContainer}
                >
                    <Text style={styles.title}>Chỉnh sửa thông tin cá nhân</Text>
                    <Ionicons name="chevron-forward-sharp" size={24} color="black" />
                </TouchableOpacity>

                {/* Doi mat khau */}
                <TouchableOpacity
                    onPress={() => handleNavigation('personalPage/changePassword')}
                    style={styles.editContainer}
                >
                    <Text style={styles.title}>Đổi mật khẩu</Text>
                    <Ionicons name="chevron-forward-sharp" size={24} color="black" />
                </TouchableOpacity>

                {/* Support nguoi dung */}
                <TouchableOpacity
                    onPress={() => handleNavigation('personalPage/supportUser')}
                    style={styles.editContainer}
                >
                    <Text style={styles.title}>Trợ giúp & hỗ trợ</Text>
                    <Ionicons name="chevron-forward-sharp" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity
                    // onPress={()=>router.replace('auth/sign-in')}
                    onPress={handleSignOut}
                    style={styles.logOutContainer}
                >
                    <Text style={styles.logOut}>Đăng xuất</Text>
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
    user: {
        fontSize: 25,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        marginTop: 10,
    },
    avatar: {
        marginTop: 50,
        width: 100,
        height: 100,
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    main: {
        flex: 1,
        marginTop: 20,
    },
    editContainer: {
        flexDirection: 'row',       
        justifyContent: 'space-between',  
        alignItems: 'center',        
        padding: 10,
        backgroundColor: Colors.GRAY_2,
        borderRadius: 10,
        marginTop: 30,
    },
    title: {
        fontSize: 18,
        fontFamily: 'outfit-regular',
    },
    logOutContainer: {
        marginTop: 100,
        marginHorizontal: 50,
    },
    logOut: {
        fontSize: 20,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        color: Colors.WHITE,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 30,
        padding: 15,
    }

})