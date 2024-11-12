import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'

export default function durian() {

  const navigation = useNavigation();

  const [expandedCard, setExpandedCard] = useState('');

  useEffect(()=> {
    navigation.setOptions({
      headerShows: true,
      headerTransparent: true,
      headerTitle: 'Kỹ thuật trồng Sầu riêng',
    })
  }, []);

  const toggleExpand = (cardIndex) => {
    setExpandedCard(expandedCard === cardIndex ? null : cardIndex);
  };

  const contentCart = [
    {
      title: '1. kiểm tra đất trồng sầu riêng.',
      shortContent: 
        'pH trong đất sụt giảm nhanh chóng bởi những nguyên nhân sau,... Nên làm thế nào để đất trồng sầu riêng cho năng suất cao nhất?',
      fullContent:
        'Đầu tiên: Bạn cần phải thu thập mẫu đất. Sau đó, phân tích hóa học của chúng để xác định chất lượng đất hiện tại. Qua đó, bạn có thể biết được các yếu tố trong đất như pH, độ dẻo. Ngoài ra, còn biết được hàm lượng dinh dưỡng và các yếu tố vi lượng khác.\n Tiếp theo cần xác định yêu cầu của đất trồng sầu riêng: Cây sầu riêng yêu cầu đất có độ dẻo vừa phải và độ pH từ 5,5 đến 6,5. Ngoài ra, cây sầu riêng cần các chất dinh dưỡng như nitơ, photpho và kali để phát triển tốt.\n Thêm phân bón: Sau khi đã biết chất lượng đất và yêu cầu của cây, bạn có thể tiến hành cải tạo đất. Một cách cải tạo tốt là thêm phân bón hữu cơ hoặc phân bón vô cơ. Việc này sẽ giúp tăng hàm lượng dinh dưỡng và cải thiện độ dẻo của đất. Ngoài ra, việc bổ sung các chất hữu cơ như phân chuồng hoặc rơm rạ cũng có thể giúp cải tạo đất và tạo ra một môi trường đất phù hợp cho cây sầu riêng phát triển. Ngoài ra, ử dụng các chất khác như đá vôi hoặc đá dolomit cũng có thể tăng độ pH của đất. Đồng thời, cải thiện sự hấp thụ chất dinh dưỡng của cây. Tuy nhiên, không nên sử dụng quá nhiều đá vôi cho sầu riêng.\n Sử dụng phương pháp phù hợp: Để đảm bảo hiệu quả của việc cải tạo đất, bạn cần sử dụng các phương pháp và công cụ phù hợp. Ví dụ, việc sử dụng máy xới đất hoặc máy đánh bùn có thể giúp phân bón và chất hữu cơ được phân bố đều trên toàn bộ khu vực trồng cây. Tạo ra một môi trường đất đồng đều và phù hợp cho cây sầu riêng phát triển.\n Cuối cùng kiểm tra định kỳ: Sau khi đã cải tạo đất, bạn cần định kỳ kiểm tra chất lượng đất. Nhằm đảm bảo rằng đất vẫn đáp ứng yêu cầu của cây sầu riêng. Nếu phát hiện ra bất kỳ vấn đề gì, bạn cần thực hiện các biện pháp khắc phục kịp thời để đảm bảo sự phát triển tốt nhất cho cây sầu riêng.',
    },
    {
      title: '2. Lựa chọn giống',
      shortContent: 'Một trong những giống sầu riêng phổ biến như DONA, Ri6, Cơm vàng sữa hạt lép,...',
      fullContent:
        'Các giống phổ biến là DONA, Ri6, Cơm vàng sữa hạt lép. Ưu tiên cây ghép từ cây đầu dòng để đảm bảo năng suất và chất lượng.',
    },
    {
      title: '3. Chuẩn bị đất',
      shortContent: 'Đất tầng sâu, thoát nước tốt.',
      fullContent:
        'Đảm bảo đất có tầng canh tác sâu, thoát nước tốt. Ph trồng từ 5.5-6.5. Đào mương và lên liếp đối với đất thấp.',
    },
  ];
      

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.containerCard}>
        <Text style={styles.h1}>Cẩm nang trồng sầu riêng</Text>
        {contentCart.map((item, index) => (
          <TouchableOpacity
           key={index}
            style={styles.card}
            onPress={() => toggleExpand(index)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>
              {expandedCard === index ? item.fullContent : item.shortContent}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: 16,
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
    backgroundColor: Colors.Green_YL,
    marginVertical: 8,
    shadowColor: Colors.PRIMARY,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 10,
    elevation: 3,
  },
  containerCard: {
    marginTop: 80,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: Colors.PRIMARY,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
  },
  
});