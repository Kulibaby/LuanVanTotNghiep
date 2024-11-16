import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'

export default function Durian() {

  const navigation = useNavigation();


  useEffect(()=> {
    navigation.setOptions({ 
      headerShows: true,
      headerTransparent: true,
      headerTitle: 'Kỹ thuật trồng Sầu riêng',
    })
  }, []);

  // nội dung canh tác sầu riêng
  const contents = [
    {
      title: '1. Cải tạo đất trồng',
      description: `Đất trồng sầu riêng cần có độ pH từ 5.5-6.5, đất phải tơi xốp, thoát nước tốt. Các loại đất tốt nhất bao gồm đất phù sa, đất thịt pha cát và đất đỏ bazan. 
      Lưu ý:
        - Cây sầu riêng chịu mặn và chịu hạn rất kém.
        - Tránh đất bị nhiễm phèn, nhiễm mặn.
        - Nếu đất có độ pH thấp, cần bón vôi để nâng pH.
        - Đảm bảo hệ thống thoát nước tốt để tránh cây bị ngập úng.
        - Sầu riêng là cây ăn quả nhiệt đới, không chịu được lạnh nên chỉ thích hợp trồng ở những vùng thấp từ ĐBSCL đến độ cao 1.000m như ở Bảo Lộc, Lâm Đồng.`,
    },
    {
      title: '2. Chọn giống Sầu riêng',
      description: `Nên chọn giống có nguồn gốc rõ ràng, chất lượng cao, phù hợp với thổ nhưỡng và khí hậu khu vực trồng.
      Một số giống phổ biến:
        - Sầu riêng Monthong: Trái to, cơm vàng nhạt, ít hạt, không ngọt gắt và có mùi thơm nhẹ. Trung bình mỗi cây sầu riêng sẽ cho năng suất từ 70-100 trái/năm.
        - Sầu riêng Ri6: Là giống sầu được bà con ưu chuộng vì dễ trồng và cho năng suất cao. Cơm dày, hạt lép, vị ngọt đậm, béo ngậy và ít xơ. Mỗi cây Ri6 từ 10-15 năm tuổi có thể cho 50-70 trái/năm.
        - Sầu riêng Khổ qua xanh: Đây là loài cây sinh trưởng và phát triển mạnh mẽ với nhiều cành nhánh sum suê. Quả thuôn dài, thường có vị ngọt hơi đắng, béo vừa và rất thơm. Những cây từ 10-15 tuổi có sản lượng trái bình quân đạt 50-60 tấn/ha
        - Sầu riêng cơm vàng sữa hạt lép: Trung bình mỗi quả sầu riêng có cân nặng từ 2-2.5kg, với phần thịt sầu riêng có màu vàng, rất thơm béo và vô cùng mềm mại.
        - Sầu riêng Musang King: Với phần vỏ mỏng, màu xanh đậm, đít trái chia thành 5 rãnh rõ ràng. Thịt sầu riêng có màu vàng dẻo, hạt lép, không xơ rất ngon với hương vị ngọt thanh đậm đà và béo ngậy. Năm đầu tiên sau khi trồng, cây cho năng suất đạt khoảng 20 trái, tăng lên 50 trái trong năm sau và có thể đạt tới 100 trái khi cây 20 năm tuổi.`,
    },
    {
      title: '3. Chọn phân bón',
      description: `Phân bón cần cung cấp đầy đủ dinh dưỡng, bao gồm:
      - Phân hữu cơ: Cải thiện độ tơi xốp của đất, cung cấp vi sinh vật. Liều lượng 10-30 kg phân chuồng hoai mục (hoặc 3-5 kg hữu cơ vi sinh)/cây/năm, định kỳ 1 lần/năm. Liều lượng phân chuồng năm thứ 1 và thứ 2 khoảng 10-20kg/ cây và đến năm thứ 4 là 25-30 kg/ cây.
      - Phân vô cơ: Bón NPK theo từng giai đoạn phát triển của cây. có thể sử dụng thêm các loại phân đơn như: ure, lân, kali
      - Vôi: liều lượng 0,5-1kg/ cây vào đầu mùa mưa. Nếu đất có pH > 6,5 thì không nên bón thêm vôi.
      Lưu ý: Sử dụng phân bón đúng liều lượng và thời điểm để tránh cây bị "bội thực".`,
    },
    {
      title: '4. Kỹ thuật chăm sóc',
      description: `Chăm sóc cây sầu riêng gồm:
      - Tưới nước: Đảm bảo độ ẩm đất, tưới 2 lần/ngày vào mùa khô.
        + Giai đoạn cây ra hoa cần tưới nước cách ngày giúp hoa phát triển tốt hạt phấn mạnh khỏe. Cần giảm khoảng 2/3 lượng nước ở mỗi lần tưới
        + Sau khi đậu quả tiến hành tưới tăng dần lượng nước đến mức bình thường trở lại, giúp quả phát triển khỏe, chất lượng cao.
        + Tủ gốc giữ ẩm: cây sầu riêng cần sử dụng rơm hoặc cỏ khô phủ kín mô đất 1 lớp dày 10-20cm, cách gốc 10-50cm tùy theo cây lớn hay nhỏ. Gốc sầu riêng khô ráo sẽ làm giảm cơ hội cho mầm bệnh tấn công vào gốc.
        + Trồng xen: trong những năm đầu khi cây sầu riêng chưa cho quả, nên trồng một số cây ngắn ngày hoặc cây ăn quả sinh trưởng, phát triển nhanh (như chuối, ổi…) làm cây trồng xen trên vườn sầu riêng.
      - Bón phân: Theo dõi từng giai đoạn để bón phân đúng thời điểm.
      - Cắt tỉa: Loại bỏ cành khô, cành sâu bệnh, tạo dáng cho cây thông thoáng.
      Lưu ý: Không để cây bị ngập nước quá lâu, dễ gây thối rễ.`,
    },
    {
      title: '5. Giải pháp phòng trừ sâu bệnh',
      description: `Một số sâu bệnh thường gặp:
      - Rệp sáp: Sử dụng thuốc trừ sâu sinh học hoặc dầu khoáng.
      - Sâu đục thân: Dùng thuốc bảo vệ thực vật và cắt bỏ phần cây bị tổn thương.
      - Bệnh thối rễ, vàng lá: Phun thuốc trị nấm, đảm bảo đất thoát nước tốt.
      Lưu ý: Theo dõi thường xuyên và xử lý ngay khi phát hiện dấu hiệu sâu bệnh.`,
    },
    {
      title: '6. Thiết kế vườn trồng',
      description: `Thiết kế lô, liếp trồng:
      - Vùng ĐBSCL: nên đào mương lên liếp để tăng độ dày tầng canh tác, chứa nước để tưới cây, thoát nước và cung cấp nước cho vườn khi cần thiết. Kích thước của mương tùy thuộc vào điều kiện riêng của từng nơi, thường mương liếp được thiết kế như sau: mương rộng 1,5-2 m, sâu 1-1,2 m; Liếp rộng 5-6m (trồng hàng đơn) hoặc liếp rộng 7-8m (trồng hàng đôi).
      - Vùng đất cao (Đông Nam Bộ và Tây Nguyên): đối với những vùng đất cao phải chọn nơi có nguồn nước suối hoặc nước ngầm để tưới cho cây sầu riêng vào mùa nắng. Vùng đất cao lên mô thấp, đường kính mô từ 70-80cm, cao 30-40 cm và cũng chuẩn bị bón lót cho hố đất với những thành phần giống như việc chuẩn bị cho 1 mô đất như trên. Hố trồng cần phải được chuẩn bị trước khi trồng từ 2-4 tuần.
      Bờ bao và cống bọng:
      - Tùy diện tích của vườn mà có một hay nhiều cống chính còn gọi là cống đầu mối đưa nước vào cho toàn khu vực. Cống nên đặt ở bờ bao, đối diện với nguồn nước chính để lấy nước vào hay thoát nước ra được nhanh. Cần chọn cống có đường kính lớn lấy đủ nước trong khoảng thời gian thủy triều cao. Nên đặt 2 cống cho nước vào và nước ra riêng để nước trong mương được lưu thông tốt.
      Mật độ và khoảng cách trồng:
      - Khoảng cách trồng là 6x6m đến 8x8m (tại khu vực ĐBSCL); từ 10x10m (ở miền Đông Nam Bộ) tùy thuộc vào vùng đất mà khoảng cách này thưa hay hẹp. Khi trồng với mật độ cao (156 cây/ ha hoặc cao hơn) cần áp dụng kỹ thuật hạ thấp chiều cao, tỉa cành thu hẹp tán cây và các biện pháp kỹ thuật phù hợp khác như cắt tỉa các cành mọc quá dày khi có thể hoặc sau mỗi vụ thu hoạch để bảo đảm vườn cây thông thoáng, góp phần hạn chế sâu bệnh phát triển, giúp cây cho năng suất quả cao và chất lượng tốt.`,
    },
    {
      title: '7. Một số yêu cầu khác về Sầu riêng mà bạn nên biết',
      description:`Một số yêu cầu:
      - Yêu cầu về nhiệt độ: Sầu riêng là cây ăn quả nhiệt đới nên có thể sinh trưởng, phát triển ở nhiệt độ từ 24-30 độ C, nhiệt độ dưới 13 độ C có thể làm cây rụng lá, sinh trưởng chậm, cây có thể chết nếu kéo dài.
      - Yêu cầu về nước và lượng mưa: Sầu riêng thuộc nhóm cây trồng mẫn cảm với mặn, chịu được nguồn nước có nồng độ mặn < 1‰. Cây sầu riêng có thể sinh trưởng, phát triển ở nơi có lượng mưa từ 1.600-4.000 mm/năm nhưng tốt nhất là 2.000 mm/năm. Mưa nhiều có thể tốt cho sinh trưởng, tuy nhiên ẩm độ cao dễ phát sinh bệnh. Trong năm cây cần một giai đoạn không mưa khoảng từ 2 tháng trở lên để giúp cây ra hoa tự nhiên thuận lợi.
      - Yêu cầu về ánh sáng: Khi cây còn nhỏ, cây thích bóng râm nên cần che mát giảm lượng ánh sáng từ 30-40%. Khi cây lớn lên các cây tự che mát nhau, không cần che bóng và cây lớn cần ánh sáng đầy đủ để phát triển.
      - Yêu cầu về gió: Sầu riêng thích hợp gió nhẹ. Cây không chịu được gió mạnh hay gió bão. Tránh trồng sầu riêng nơi có gió mạnh trong điều kiện khô nóng.`,
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