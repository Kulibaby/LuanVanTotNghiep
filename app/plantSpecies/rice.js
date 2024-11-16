import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'

export default function Rice() {

    const navigation = useNavigation();

    useEffect(()=> {
      navigation.setOptions({
        headerShows: true,
        headerTransparent: true,
        headerTitle: 'Kỹ thuật trồng Lúa nước',
      })
    }, []);

    //canh tac lua
    const contents = [
      {
        title: '1. Làm đất và chọn giống',
        description:`Thực hiện theo các bước:
        - Bước 1:  cày hoặc xới đất cho đất tươi sốp
        - Bước 2: thực hiện chọn giống ( Hiện nay nhiều khu vực đang bị ngập mặn và nhiễm phèn vì vậy việc chọn giống lúa phù hợp rất quan trọng, giống lúa canh tác phải  phù hợp với điều kiện khí hậu và thổ nhưỡng của địa phương. Để đảm bảo cây lúa thích nghi và phát triền tốt nên chọn các loại giống có khả năng chống chịu được sâu bệnh như: ST25, OM5451, OM1490, OMCS2000, lúa thơm,…)
        - Bước 3: Ngâm giống: thực hiện ngâm giống 1 ngày 1 đêm -> sau đó đem lọc ra những hạt đã bị lép -> Rồi đem đi ủ 1 ngày -> Rồi lại đem ra Làm ẩm lúa sau đó đem ủ cho hạt lúa lên mầm.`,
      },
      {
        title: '2. Chuẩn bị đất trồng lúa',
        description: `Đất ở giai đoạn một sau khi đã xớt lên đến khi ngâm giống xong cần được kiểm tra độ ph và nồng độ dinh dưỡng trước khi trồng. Nếu đất có độ màu mỡ kém bà con cần điều chỉnh cách sử dụng phân bón để cung cấp chất dinh dưỡng hợp lý.`,
      },
      {
        title: '3. Chuẩn bị hệ thống tưới tiêu',
        description: `Nước đóng vai trò quan trọng trong việc phát triển của lúa nước. Chính vì vậy, hệ thống tưới tiêu cần được chuẩn bị kỹ trước khi gieo trồng. Đảm bảo tưới tiêu cho lúa có thể tiến hanh thuận lợi.`,
      },
      {
        title: '4. Gieo cấy lúa',
        description: `Giai đoạn gieo cấy lúa này bà con cần lưu ý 3 điểm chính như sau:
        -	Thời gian gieo cấy: Hiện tại trên đồng băng Sông cửu long có 3 mùa vụ lúa nước trên năm đó là mùa đông xuân, hè thu và thu đông. Tốt nhất bà con nên theo dõi lịch thời vụ theo khuyến cáo của cơ quan địa phương.
        -	Mật độ gieo cấy: Mỗi giống lúa có mật độ gieo cấy khác nhau bà con nông dân nên gieo cấy với mật độ phù hợp để đảm báo năng suất hạt lúa được cao nhất
        -	Công cụ gieo cấy.`,
      },
      {
        title: '5. Chăm sóc cây lúa',
        description: `Tưới tiêu:Điều chỉnh mực nước thích hợp theo từng giai đoạn sinh trưởng của cây lúa, không để ruộng ngập úng hoặc bị khô hạn.
        Thoát nước: Khi mưa lớn hoặc đồng ruộng bị ngập úng, cần nhanh chóng thoát nước để tránh ngộ độc rễ, ảnh hưởng đến sinh trưởng.
        Bón phân:Sử dụng phân bón hợp lý, tùy theo loại đất để bón phân cân đối đạm, lân, kali. Bón phân hữu cơ và phân lân lót hoặc thúc sớm, bón phân đạm theo bảng so màu lá lúa. Phun thêm phân bón lá có hàm lượng lân và kali cao nhằm tăng sức đề kháng của cây.
        Có thể chia ra làm các đợt bón phân như sau:
        - Bón lót: bón trước khi gieo sạ. Bón 8 - 10 tấn/ha phân hữu cơ và toàn bộ phân lân.
        - Đợt 1: 7 - 10 ngày sau sạ (NSS).
          Bón 20% urê + 20% kali
          Chú ý: phải đưa nước vào ngập ruộng 5cm trước khi bón phân.
        - Đợt 2: 18 - 22 NSS.
          Bón 40% urê + 30% kali
          Lưu ý: 
          - Bón vá áo vào những chỗ xấu để điều chỉnh độ đồng đều của ruộng lúa.
          - Bón bổ sung chế phẩm kích thích sinh trưởng ở nơi có mật độ sạ thấp hoặc giống nẩy chồi kém để gia tăng số chồi hữu hiệu.
        - Đợt 3: Bón phân đón đòng
          Sau khi rút nước giữa vụ (30 - 40 NSS), để lúa vàng 2/3 đám ruộng, cho nước vào và bón phân đợt 3.
          Bón 30% urê + 40% kali.
          Lưu ý: lá còn xanh không nên bón phân. Giữ nước trong ruộng đến khi lúa chín sáp nhằm tránh hạt lúa bị lép.
        - Đợt 4: 55 - 72 NSS
          Bón 10% urê + 10% kali
          Cần giữ mực nước trong ruộng (cao 3-5cm) liên tục trong vòng khoảng 10 ngày để đủ nước cho cây lúa trổ và thụ phấn thụ tinh, giúp hạt lúa không bị lép lửng.
        Làm cỏ tỉa cây:
        - Cày vùi lấp toàn bộ cỏ, bừa trục kỹ mới gieo sạ lúa. Đưa nước vào ruộng ngập khoảng 5cm để ém cỏ.
        - Kết hợp dặm tỉa lúa và nhổ cỏ, cắt các bông cỏ còn sót trên ruộng trước khi cỏ kết hạt và rơi rụng.
        - Sử dụng thuốc trừ cỏ có hoạt chất Acetochlor và Bensulfuron Metyl, Pretilachlor, Butachlor. Liều lượng theo khuyến cáo trên nhãn thuốc.
        - Thời điểm làm cỏ:
          + Lần 1: 7-10 ngày sau cấy/sạ.
          + Lần 2: 20-25 ngày sau cấy/sạ (kết hợp với bón thúc lần 2).
        Các loại sâu bệnh thường gặp và biện pháp phòng trừ
        - Sâu cuốn lá:
          + Triệu chứng: Lá bị cuốn lại, làm giảm diện tích quang hợp.
          + Biện pháp: Sử dụng thuốc trừ sâu sinh học hoặc hóa học như Regent, Virtako.
        - Sâu đục thân:
          + Triệu chứng: Gây hiện tượng lúa bị bông bạc, thân rỗng.
          + Biện pháp: Sử dụng thuốc Padan, Regent khi phát hiện trứng sâu.
        - Rầy nâu:
          + Triệu chứng: Chích hút nhựa, gây hiện tượng cháy rầy.
          + Biện pháp: Dùng thuốc Buprofezin, Thiamethoxam, phun vào sáng sớm hoặc chiều mát.
        - Bệnh đạo ôn (cháy lá):
          + Triệu chứng: Xuất hiện đốm hình thoi trên lá, làm lá khô héo.
          + Biện pháp: Sử dụng thuốc phun như Beam, Fuji-one, giữ đồng ruộng thông thoáng.
        - Bệnh bạc lá:
          + Triệu chứng: Lá lúa bị cháy từ mép, bạc trắng.
          + Biện pháp: Phun thuốc Kasugamycin, hạn chế bón đạm quá nhiều.
        - Bệnh khô vằn:
          + Triệu chứng: Xuất hiện vết bệnh hình bầu dục, màu xám.
          + Biện pháp: Phun Tilt Super, Anvil khi bệnh mới xuất hiện.`,
      },
      {
        title: '6. Thu hoạch và bảo quản',
        description: `Sau khi thu hoạch lúa cần được bảo quan nơi khô ráo, thoáng mát không có ánh sáng mặt trời chiếu trực tiếp, để ngăn ngừa vi khuẩn, nấm móc và côn trùng.
        Đất sau khi thu hoạch cần cho nước vào ngâm giữa đất luôn tới xốp và những rạ lúa còn lại cũng sẽ được phân hủy để làm chất hữu cơ cho đất. Cần cho đất nghỉ ngơi bù đất dinh dưỡng giúp đất luôn tốt để có mùa vụ tiếp theo năng suất cao.`,
      },
    ];

  return (
    <View style={styles.container}>
    {/* header */}
    <View style={styles.header}></View>

    {/* main */}
    <ScrollView contentContainerStyle={styles.containerScroll}>
      {contents.map((contents, index) => (
        <View key={index} style={styles.contetContainer}>
          <Text style={styles.contetTitle}>{contents.title}</Text>
          <Text style={styles.contetDescription}>{contents.description}</Text>
        </View>
      ))}
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
    backgroundColor: Colors.Green_W,
    width: '100%',
    height: 90,
  },
  containerScroll: {
    padding: 20,
  },
  contetContainer: {
    marginBottom: 20,
  },
  contetTitle: {
    fontSize: 20,
    fontFamily: 'outfit-bold',
    marginBottom: 5,
    color: Colors.PRIMARY,
  },
  contetDescription: {
    fontSize: 16,
    fontFamily: 'outfit-regular',
    lineHeight: 22,
    color: Colors.PRIMARY,
  }, 
});