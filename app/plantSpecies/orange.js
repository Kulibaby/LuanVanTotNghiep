import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'

export default function Orange() {

    const navigation = useNavigation();

    useEffect(()=> {
        navigation.setOptions({
        headerShows: true,
        headerTransparent: true,
        headerTitle: 'Kỹ thuật trồng Cam',
    })
  }, []);
  
  // ct trong cam
  const contents = [
    {
      title: '1. Cải tạo đất trồng cam',
      description: `Cây cam có thể trồng ở nhiều loại đất từ đất thung lũng, đất phù sa cổ, đất đồi mới khai hoang, đất phù sa, đất bồi, …Loại đất phù hợp nhất là đất thịt, nhiều mùn, thoát nước tốt, mực nước ngầm dưới 1m. Tầng đất canh tác dày khoảng 0,8 - 1m, độ pH từ 5 - 7.
      Lưu ý:
        - Trước khi trồng nên bón lót phân chuồng hoai mục, vôi rồi phơi ải từ 15 - 20 ngày trước trồng để xử lý các mầm bệnh có trong đất.- Đối với những vùng đất nhiễm mặn, nhiễm phèn không thích hợp cho việc trồng cam. 
        - Đối với các vùng đất có mực nước ngầm cao, khả năng thoát nước kém thì cần xây dựng hệ thống thoát nước hoặc lên luống cao để trồng.
        - Cam cần ánh sáng đầy đủ, nhưng nên có biện pháp che chắn gió mạnh.`,
    },
    {
      title: '2. Chọn và xử lý cây giống',
      description: `Trên thị trường hiện nay có những giống cam như cam sành, cam Cao Phong, canh Vinh, cam Xoàn… tùy thuộc vào điều kiện và sở thích mà bà con có thể lựa chọn giống cho phù hợp. Khi chọn cây giống nên chọn các cây cao trên 30cm, khỏe mạnh, cứng cáp, không bị sâu bệnh. Loại chiết cành cây sẽ mau ra trái nhưng tuổi thọ kém, bộ rễ yếu. Cây ghép khỏe mạnh hơn, tuổi thọ lâu, bộ rễ phát triển khỏe mạnh hơn. Trồng bằng hạt cây sẽ lâu ra trái và năng suất thường kém hơn.
      Có 2 phương pháp nhân giống cam là chiết cành và ghép cành. Mỗi phương pháp nhân giống có những ưu điểm và khuyết điểm riêng:
        - Chiết cành: cây mau ra quả nhưng tuổi thọ kém, rễ yếu;
        - Ghép cành: cây và bộ rễ khỏe hơn, cứng cáp hơn cây giống chiết cành.`,
    },
    {
      title: '3. Thời vụ và mật độ trồng cam',
      description: `Thời vụ:
        - Miền Bắc:
          + Thích hợp nhất là tháng 2 - tháng 4 (sau Tết Nguyên đán) hoặc tháng 8 - tháng 10.
          + Lúc này, điều kiện thời tiết mát mẻ, độ ẩm cao, giúp cây con dễ phát triển bộ rễ.
        - Miền Nam:
            + Thời vụ trồng tốt nhất là vào đầu mùa mưa (tháng 5 - tháng 7), tận dụng độ ẩm từ mưa để cây phát triển nhanh chóng.
      Mật độ trồng cam:
        - Với các giống cam có tán rộng như cam sành, cam Vinh:
          + Cây cách nhau từ 3 - 4m, hàng cách nhau từ 4 - 5m.
        - Với giống cam có tán nhỏ hơn (cam đường canh, cam xoàn):
          + Cây cách nhau từ 2,5 - 3m, hàng cách nhau từ 3,5 - 4m.
      `,
    },
    {
      title: '4. Kỹ thuật chăm sóc',
      description: `Tới nước:
        - Cần tưới nước thường xuyên để cây sinh trưởng và phát triển tốt. Đối với các tỉnh miền núi thời tiết thường khô hạn, cần tưới nước cho cây để đảm bảo đủ độ ẩm trong đất. Tưới nước đầy đủ, đặc biệt trong giai đoạn cây ra hoa và kết trái.
        - Áp dụng phương pháp tưới thẩm thấu hoặc tưới phun mưa. Nếu chủ động được về lượng nước tưới cho cây thì tháo nước vào các rãnh nông để cho nước ngấm vào cây một này thì tháo nước cạn đi là phương pháp tốt nhất.
        Lưu ý:
        - Không nên để vườn bị ngập nước vì sẽ làm cây cam bị úng nước, quá trình sinh trưởng dần kém đi, cây có thể chết.
      Phân bón:
        - Sử dụng phân hữu cơ vi sinh hoặc phân bón sinh học, hạn chế phân hóa học.
        - Sau khi trồng: dùng hỗn hợp 40gam DAP hòa tan trong 10l nước để tưới cho cây cam, có thể lựa chọn sử dụng phân cá ủ hoặc phân tôm.
        - Đối với cây trên 1 năm tuổi: Sử dụng phân vi sinh EM, WEHG tưới để phân hữu cơ phân hủy tạo thành chất vô cơ cho cây trồng.
        Có thể bón phân bằng phương pháp cuốc rãnh xung quanh gốc, cho phân vào và lấp đất. Rảnh này phải cách gốc ít nhất là 50cm. Hoặc cuốc nhẹ lớp đất quanh tán cây, cho đất vào, tưới nước và dùng tay nén nhẹ nhàng.
      Tỉa cành: Cần chú ý tỉa cành, tỉa lá cho cây thường. Cắt tỉa lá già, lá yếu và các lá bị bệnh nhằm mục đích làm cho sâu bệnh hại cây không có chỗ sinh sôi nảy nở và không tốn thêm chất dinh dưỡng nuôi các lá bị sâu bệnh, các lá già yếu sắp hỏng. Cần thực hiện cắt  bỏ những cành Cam sum xuê xung quanh gốc, những cành cây khô già và cành nhỏ, yếu  để tạo độ thông thoáng giúp cây nhận được ánh sáng, lượng chất dinh dưỡng tối đa để đạt được  năng suất tốt nhất.`,
    },
    {
      title: '5. Phòng trừ sâu bệnh',
      description: `Các loại côn trùng gây hại thường gặp ở cây cam:
      - Sâu vẽ bùa: Gây hại cho chồi non, làm cho hoa và quả bị rụng. Có thể phun thuốc bảo vệ thực vật cho cây cam bị sâu vẽ bùa tấn công.
      - Sâu đục thân, sâu đục cành, bọ cánh cứng: Diệt trừ các loại này bằng cách bắt các vi sinh vật phá hoại và cắt bỏ những cành héo
      - Bọ xít, rệp, rầy: Sử dụng thuốc Bi58 0,05-0,1% phun cho cây. Loại bỏ các cành cây bị loài này tấn công, tránh lây lan sang các cây bên cạnh.
      - Bệnh đốm lá, loét: Tiến hành phun định kỳ để phòng tránh bệnh sau khi cây ra đọt. Hoặc tiêu hủy các phần cây bị bệnh tránh ảnh hưởng đến các bộ phận khác của cây.
      Lưu ý: Áp dụng biện pháp sinh học, hạn chế thuốc bảo vệ thực vật hóa học.`
    },
    {
      title: '6. Thu hoạch',
      description: `Thời gian thu hoạch: Cam sành thường cho thu hoạch sau khoảng 8-10 tháng trồng. Khi vỏ quả chuyển sang màu vàng cam, quả có vị ngọt, mọng nước là lúc thích hợp để thu hoạch.
      Phương pháp thu hoạch: Nên thu hoạch bằng tay để tránh làm tổn thương quả. Cắt cả cuống quả để bảo quản tốt hơn.`,
    }
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