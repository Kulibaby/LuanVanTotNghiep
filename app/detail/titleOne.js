import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from './../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRouter } from 'expo-router'

export default function titleOne() {

    const router = useRouter();
    const navigation = useNavigation();

   // Ẩn tiêu đề 
   useEffect(()=>{
    navigation.setOptions({
      headerShown: false
    })
    }, [])

  return (
    <ScrollView style={styles.container}>
      {/* Header Title */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon}
            onPress={()=>router.back()}>
            <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <Image
            source={require('./../../assets/images/Image_logo_app.png')}
            style={styles.logo}
        />
        </View>

        {/* Main */}
        <View style={styles.main}>
            <Image
                source={require('./../../assets/images/sau-rieng.jpg')}  
                style={styles.newsImage}
            />
            <Text style={styles.title}>
                Sầu riêng 1 vốn 5 lời: Đại gia Việt đua nhau trồng, dự thu lãi hàng nghìn tỷ
            </Text>
            <Text style={styles.description}>
                Không chỉ nông dân mà các đại gia Việt như bầu Đức, tỷ phú Trần Bá Dương… cũng đua nhau trồng sầu riêng khi loại cây này đang cho lãi từ 1,2-3 tỷ đồng/ha. Đây là mặt hàng cho lợi nhuận "siêu khủng" trong ngành nông nghiệp hiện nay.{"\n"}
                {"\n"}
                Đua nhau trồng “cây tỷ đô”{"\n"}
                {"\n"}
                Phụ thuộc hoàn toàn vào thị trường Trung Quốc, thế nhưng chỉ sau một năm xuất khẩu chính ngạch, sầu riêng Việt Nam đã trở thành “cây tỷ đô” mới của Việt Nam khi kim ngạch năm 2023 đạt khoảng 2,3 tỷ USD. {"\n"}
                {"\n"}
                Giá sầu riêng theo đó tăng phi mã, thành mặt hàng siêu đắt đỏ. Hiện, giá sầu riêng thu mua tại vườn dao động từ 125.000-200.000 đồng/kg. Nhờ đó, nông dân trồng sầu riêng trong năm vừa qua có thể thu lãi từ 1,2-3 tỷ đồng/ha tùy thời điểm và năng suất. Đây là mức lợi nhuận siêu khủng, khó có mặt hàng nào trong ngành nông nghiệp ở nước ta đạt được hiện nay.{"\n"}
                {"\n"}
                Bởi thế, nông dân ở nhiều tỉnh, thành đua nhau mở rộng diện tích trồng "cây tỷ đô" này. Theo Cục Trồng trọt (Bộ NN-PTNT), tổng diện tích sầu riêng năm 2023 ở nước ta ước đã lên tới 131.000ha, tăng 20% so với năm 2022.{"\n"}
            </Text>

            <Image 
                source={require('./../../assets/images/sau_rieng_bd.jpg')}
                style={styles.newsImage}
            />

            <Text style={styles.description}>
            {"\n"}
                Khi nói về lợi nhuận của cây sầu riêng, ông Đoàn Nguyên Đức {"("}bầu Đức{")"} - Chủ tịch HĐQT HAGL {"("}HAG{")"} – thừa nhận, đây là cây trồng “1 vốn 5 lời”. Điều này chính bản thân ông cũng cảm thấy bất ngờ.{"\n"}
                {"\n"}
                Bầu Đức cho biết, công ty ông đã trồng 1.200ha sầu riêng, trong đó 700ha cho thu hoạch vào tháng 10-11 vừa qua. Doanh nghiệp của ông mới xuất bán khoảng 440 tấn sầu riêng với giá gần 100.000 đồng/kg, thu về vài chục tỷ đồng.{"\n"}
                {"\n"}
                “Mua sầu riêng của tôi đều là khách hàng lớn tại Trung Quốc”, bầu Đức chia sẻ. Năm nay, ông tính toán sản lượng thu hoạch sẽ lên tới vài nghìn tấn. Sầu riêng được thu hoạch sẽ bán trực tiếp cho các nhà nhập khẩu Trung Quốc chứ không qua khâu trung gian.{"\n"}
                {"\n"}
                HAGL đang trồng thêm sầu riêng với mục tiêu đạt tổng diện tích 2.000 ha vào năm 2026.{"\n"}
                {"\n"}
                Theo nội dung được thông qua tại Đại hội bất thường, HAGL Agrico {"("}HNG{")"} của tỷ phú Trần Bá Dương cũng quyết “làm thương vụ lớn” tại Lào khi tính toán đầu tư 18.000 tỷ đồng để trồng chuối, sầu riêng, nuôi bò…, lợi nhuận dự kiến 2.450 tỷ đồng/năm.{"\n"}
                {"\n"}
                Thời gian hoàn thiện đầu tư dự án từ năm 2024 đến 2028. Riêng với cây sầu riêng, HNG ước tính sản lượng xuất khẩu sau khi hoàn thành lên đến 9.500 tấn/năm. {"\n"}
                {"\n"}
                Là doanh nghiệp cao su lớn, song từ năm 2018, Công ty CP Đầu tư Cao su Đắk Lắk {"("}DRI{")"} bắt đầu chuyển hướng đầu tư thêm các cây trồng khác, trong đó có sầu riêng.{"\n"}
                {"\n"}
                Đáng chú ý, báo cáo tài chính hợp nhất quý IV/2023 của DRI vừa công bố cho thấy doanh thu 148 tỷ đồng - tăng nhẹ so với cùng kỳ, trong đó có doanh thu từ sầu riêng. Đây là quý đầu tiên DRI ghi nhận nguồn thu từ sầu riêng - loại nông sản gây chú ý trong năm qua khi giá lập đỉnh lịch sử và neo ở mức cao, mang về 2,3 tỷ USD cho ngành nông nghiệp Việt. {"\n"}
                {"\n"}
                Theo ghi nhận của DRI, với giá vốn chỉ 365,4 triệu đồng, tức mảng sầu riêng của DRI đang cho mức hiệu suất lên đến “1 vốn 6 lời”.
            </Text>
        </View>

    </ScrollView>
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
        padding: 10,
        backgroundColor: Colors.Green_Mix
    },
    logo: {
        width: 100,
        height: 60,
        resizeMode: 'contain',
        marginRight: 20,
    },
    main: {
        padding: 20,
    },
    newsImage: {
        width: 370,
        height: 200,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontFamily: 'outfit-bold',
        marginTop: 10,
    },
    description: {
        fontSize: 14,
        fontFamily: 'outfit-regular',
        color: Colors.PRIMARY,
        paddingBottom: 10,
    }

})