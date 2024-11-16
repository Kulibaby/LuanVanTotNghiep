import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {

    const router = useRouter();

    return (
        <View 
            style={styles.container}
            nestedScrollEnabled={true}
        >
            {/* Header Home */}
            <View style={styles.header}>
                <Image
                    source={require('./../../assets/images/Image_logo_app.png')}
                    style={styles.logo}
                />
            </View>

            {/* Main */}
            <ScrollView style={styles.main}>
                {/* Title 1 */}
                <TouchableOpacity 
                    style={styles.itemContainer}
                    onPress={()=>router.push('/detail/titleOne')}
                >
                    <Image 
                        source={require('./../../assets/images/sau-rieng.jpg')}
                        resizeMode="contain"
                        style={styles.imgMain}
                    />

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            Sầu riêng 1 vốn 5 lời: Đại gia Việt đua nhau trồng, dự thu lãi hàng nghìn tỷ
                        </Text>
                        <Text style={styles.description}>
                            Không chỉ nông dân mà các đại gia Việt như bầu Đức, tỷ phú Trần Bá Dương… cũng đua nhau trồng sầu riêng khi loại cây này đang cho lãi từ 1,2-3 tỷ đồng/ha.
                        </Text>
                    </View>
                </TouchableOpacity>

                 {/* Title 2 */}
                 <TouchableOpacity 
                    style={styles.itemContainer}
                    onPress={()=>router.push('/detail/titleTwo')}
                 >
                    <Image 
                        source={require('./../../assets/images/ky-su-phan-bon.jpeg')}
                        resizeMode="contain"
                        style={styles.imgMain}
                    />

                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                         'Nín thở' chờ Quốc hội thông qua thuế giá trị gia tăng phân bón
                        </Text>
                        <Text style={styles.description}>
                            'Tọa đàm tham vấn về ảnh hưởng của thuế GTGT 5% đối với ngành phân bón' thu hút sự quan tâm lớn của dư luận trước thềm kỳ họp Quốc hội ngày 21/10 tới.
                        </Text>
                    </View>
                </TouchableOpacity>             
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: Colors.Green_W,
    },
    logo: {
        width: 120,
        height: 80,
        resizeMode: 'contain',
        marginTop: 15,
    },
    main: {
        padding: 10,
    },
    imgMain: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 10,
    },
    itemContainer: {
         alignItems: 'center',
         padding: 20
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontFamily: 'outfit-bold'
    },
    description: {
        fontSize: 14,
        fontFamily: 'outfit-regular',
        color: Colors.PRIMARY,
    }
})