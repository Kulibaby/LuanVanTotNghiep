import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from './../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, useRouter } from 'expo-router'

export default function titleTwo() {

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
                source={require('./../../assets/images/ky-su-phan-bon.jpeg')}
                style={styles.newsImage}
            />
            <Text style={styles.title}>
                'Nín thở' chờ Quốc hội thông qua thuế giá trị gia tăng phân bón
            </Text>
            <Text style={styles.description}>
                Chiều 17/10, tại Trường Đại học Ngoại thương {"("}Hà Nội{")"}, Tổng Hội Nông nghiệp và Phát triển Nông thôn Việt Nam, Hội Tư vấn Thuế Việt Nam cùng Trường Đại học Ngoại thương phối hợp tổ chức buổi “Toạ đàm tham vấn ảnh hưởng của việc áp dụng thuế GTGT 5% đến ngành phân bón”.{"\n"}
                {"\n"}
                Đây là sự kiện quan trọng nhằm cung cấp cho các cơ cái nhìn khoa học và khách quan trước khi Quốc hội khóa XV đưa ra quyết định cuối cùng về việc sửa đổi Luật thuế GTGT tại Kỳ họp thứ VIII, dự kiến diễn ra vào ngày 21/10/2024 có đưa phân bón vào diện chịu thuế GTGT 5% như trước kia hay giữ nguyên là đối tượng không chịu thuế như hiện tại.{"\n"}
                {"\n"}
                Phân bón đóng vai trò không thể thiếu trong sản xuất nông nghiệp, với mức đóng góp từ 64-68% giá trị sản xuất nông nghiệp của Việt Nam. Với nhu cầu hàng năm ước tính khoảng 10,5 - 11 triệu tấn, việc áp dụng thuế GTGT 5% sẽ tác động sâu rộng tới cả doanh nghiệp sản xuất phân bón và người nông dân.{"\n"}
                {"\n"}
                TS Phùng Hà, Chủ tịch Hiệp hội Phân bón Việt Nam nhấn mạnh: "Từ năm 2015, khi Luật Thuế 71 có hiệu lực, Hiệp hội đã kiên trì kiến nghị yêu cầu chuyển phân bón từ mặt hàng không chịu thuế sang chịu thuế GTGT 5%".{"\n"}
                {"\n"}
                Theo TS Phùng Hà, việc này sẽ giúp các doanh nghiệp phân bón được khấu trừ thuế đầu vào, từ đó giảm chi phí sản xuất và cải thiện khả năng cạnh tranh với phân bón nhập khẩu. Đồng thời, việc áp thuế GTGT 5% sẽ tạo động lực cho các doanh nghiệp đầu tư vào công nghệ sản xuất phân bón thế hệ mới, góp phần giảm phát thải khí nhà kính và phù hợp với mục tiêu Net Zero 2050 của Chính phủ". {"\n"}
            </Text>

            <Image 
                source={require('./../../assets/images/buoi_toa_dam.jpg')}
                style={styles.newsImage}
            />

            <Text style={styles.description}>
                Tại buổi tọa đàm, đa phần các chuyên gia, đại biểu đều cho rằng, việc áp dụng thuế GTGT sẽ giúp các doanh nghiệp giảm chi phí đầu vào, qua đó mở rộng đầu tư và tạo thêm việc làm cho người lao động. Tuy nhiên, vẫn còn những ý kiến băn khoăn liệu nông dân có thể phải gánh chịu chi phí tăng lên, đặc biệt trong thời gian ngắn hạn khi giá phân bón có thể bị điều chỉnh.{"\n"}
                {"\n"}
                Ông Nguyễn Hoàng Trung, Phó Tổng Giám đốc Công ty Cổ phần DAP-Vinachem, cho biết: “Nếu được áp thuế GTGT 5%, chúng tôi sẽ không còn phải cộng thêm chi phí sản xuất vào giá thành sản phẩm, từ đó giúp giảm giá phân bón trên thị trường. Chúng tôi cam kết không tăng giá, và thậm chí sẽ xem xét giảm giá ít nhất 2,5% để hỗ trợ nông dân".{"\n"}
                {"\n"}
                Nói về việc người nông dân được lợi gì khi thuế GTGT phân bón thay đổi, ông Nguyễn Trí Ngọc, Phó Chủ tịch Hiệp hội Phân bón Việt Nam cho rằng: "Trong thời gian ngắn hạn, người nông dân có thể gặp khó khăn do giá phân bón tăng. Tuy nhiên, về lâu dài, họ sẽ hưởng lợi từ chính sách thuế GTGT 5% khi doanh nghiệp được khấu trừ thuế đầu vào, giảm chi phí sản xuất".{"\n"}
                {"\n"}
                Cụ thể, việc áp thuế GTGT sẽ tạo cơ hội cho các doanh nghiệp đầu tư vào công nghệ sản xuất phân bón mới. Phần thuế GTGT được khấu trừ sẽ giảm tổng mức đầu tư, tạo điều kiện thuận lợi để doanh nghiệp mạnh dạn đầu tư vào các dự án mới nhằm đổi mới công nghệ, nâng cao chất lượng sản phẩm, và giảm thiểu tác động tiêu cực đến môi trường.{"\n"}
                {"\n"}
                Đưa ra sơ đồ hạch toán giá thành và thuế GTGT với tình huống áp thuế GTGT 5% cho phân bón, ông Nguyễn Đình Cư, Phó chủ tịch Hội Tư vấn Thuế Việt Nam, cho rằng, việc phân bón không chịu thuế GTGT hiện nay khiến nhà nông không phải trả thuế GTGT khi mua phân bón, nhưng các cơ sở sản xuất không thể khấu trừ thuế GTGT đầu vào, dẫn đến chi phí sản xuất tăng. Đồng thời, ngân sách nhà nước cũng mất nguồn thu thuế GTGT từ phân bón sản xuất nội địa và hàng nhập khẩu.{"\n"}
                {"\n"}
                Nếu áp dụng thuế GTGT, theo ông Cư, nhà sản xuất có thể khấu trừ thuế GTGT đầu vào, giảm giá thành và tạo cơ hội giảm giá bán. Tuy nhiên, ông cũng lưu ý về tâm lý e ngại giá phân bón có thể tăng ban đầu và rủi ro dòng tiền khi hoàn thuế chậm.{"\n"}
            </Text>

            <Image
                source={require('./../../assets/images/so-do-thue.jpg')}
                style={styles.newsImage}
            />

            <Text style={styles.description}>
                Bên cạnh đó, các cơ quan nhà nước {"("}Ngân sách nhà nước và Cơ quan thuế{")"} cần tăng thu thuế GTGT đối với hàng nhập khẩu, tăng cường quản lý thuế, tạo môi trường thuế bình đẳng, tăng khối lượng công việc để giải quyết hồ sơ hoàn thuế GTGT để đảm bảo hài hòa lợi ích giữa tất cả các bên.
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