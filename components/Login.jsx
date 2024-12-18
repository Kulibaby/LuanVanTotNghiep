import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function Login() {

    const router = useRouter();

    return (
        <View>
            <View>
                <Image source={require('./../assets/images/Image_logo_app.png')}
                    style={{
                        width: '100%',
                        height: 470,
                    }}
                />
            </View>

            <View style={styles.container}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 30,
                    textAlign: 'center',
                    marginTop: 15,
                }}>
                    Chào mừng bạn đến với {"\n"} Sổ tay Nông dân!
                </Text>

                <Text style={{
                    fontSize: 20,
                    fontFamily: 'outfit-regular',
                    textAlign: 'center',
                    color: Colors.GRAY,
                    marginTop: 15,
                }}>
                    Hãy cùng khám phá các kỹ thuật trồng trọt tiên tiến, cập nhật thông tin thị trường chính xác và lập kế hoạch canh tác hiệu quả ngay hôm nay
                </Text>

                <TouchableOpacity
                    style={styles.buttonSignIn}
                    onPress={() => router.push("auth/sign-in")}
                >
                    <Text style={{
                        color: Colors.WHITE,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,

                    }}>Bắt Đầu Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        marginTop: -15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '100%',
        padding: 15,
    },
    buttonSignIn: {
        padding: 15,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 99,
        marginTop: '15%',
        marginLeft: 35,
        marginRight: 35,
    }
})