import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "./../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PrivacyPolicyPage() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View>
      <TouchableOpacity style={styles.icon} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Chính Sách Bảo Mật</Text>

        <Text style={styles.sectionTitle}>1. Mục Tiêu Bảo Mật</Text>
        <Text style={styles.text}>
          Chúng tôi cam kết bảo vệ dữ liệu cá nhân của bạn và sử dụng để có thể
          liện hệ hợp tác trong nông nghiệp thông qua ứng dụng.
        </Text>

        <Text style={styles.sectionTitle}>2. Bảo Vệ Dữ Liệu Cá Nhân</Text>
        <Text style={styles.text}>
          Dữ liệu cá nhân như tên, email, số điện thoại của bạn sẽ được mã hóa
          và chỉ được chia sẻ khi có sự đồng ý của bạn.
        </Text>

        <Text style={styles.sectionTitle}>3. Dữ Liệu Nông Nghiệp</Text>
        <Text style={styles.text}>
          Dữ liệu về quy trình canh tác, giống cây trồng và các hoạt động nông
          nghiệp khác được cung cấp từ những nguồn đáng tin cậy từ các tổ chứ
          được công nhận từ nhà nước.
        </Text>

        <Text style={styles.sectionTitle}>4. Quyền Riêng Tư Và Đồng Ý</Text>
        <Text style={styles.text}>
          Bạn có quyền yêu cầu sửa đổi, cập nhật hoặc xóa thông tin cá nhân của
          mình bất cứ lúc nào.
        </Text>

        <Text style={styles.sectionTitle}>5. Không Giao Dịch Tài Chính</Text>
        <Text style={styles.text}>
          Ứng dụng không hỗ trợ các giao dịch tài chính hoặc thanh toán trực
          tuyến, vì vậy không thu thập hoặc xử lý thông tin tài chính của người
          dùng.
        </Text>

        <Text style={styles.sectionTitle}>6. Cập Nhật Chính Sách</Text>
        <Text style={styles.text}>
          Chính sách bảo mật này có thể được cập nhật theo thời gian để đảm bảo
          bảo vệ thông tin cá nhân của bạn.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  icon: {
    marginTop: 10,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    textAlign: "center",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 10,
    fontFamily: "outfit-regular",
  },
  content: {
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
