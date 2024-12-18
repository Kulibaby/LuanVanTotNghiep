import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "./../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { db } from "./../../configs/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function TechniqueScreen() {
  const navigation = useNavigation();

  const [selectedPlant, setSelectedPlant] = useState(null);
  const [fertilizer, setFertilizer] = useState("");

  // sau rieng
  const [area, setArea] = useState("");
  const [treeCount, setTreeCount] = useState("");
  const [fertilizerPerTree, setFertilizerPerTree] = useState("");

  const [actualCost, setActualCost] = useState(null);



  //reset value
  useEffect(() => {
    setArea("");
    setTreeCount("");
    setFertilizerPerTree("");
    setFertilizer("");
    setActualCost(null);
  }, [selectedPlant]);

  //router điều hướng
  const plantRouter = {
    saurieng: "plantSpecies/durian",
    cam: "plantSpecies/orange",
    lua: "plantSpecies/rice",
  };

  //Hàm điều hướng
  const handleNavigate = () => {
    console.log("Selected Plant: ", selectedPlant);
    if (!selectedPlant || selectedPlant === "loai") {
      Alert.alert(
        "Thông báo",
        "Vui lòng chọn loại cây trồng trước khi ước tính & kỹ thuật."
      );
    } else if (plantRouter[selectedPlant]) {
      navigation.navigate(plantRouter[selectedPlant]);
    } else {
      Alert.alert("Thông báo", "Không tìm thấy loại cây trồng!");
    }
  };

  // Hàm xử lý khi chọn loại cây
  const handlePlantChange = (itemValue) => {
    if (!itemValue) {
      setSelectedPlant(null);
      setArea("");
      setTreeCount("");
      setFertilizerPerTree("");
      setFertilizer("");
    } else {
      setSelectedPlant(itemValue);
    }
  };

  // Đơn vị tính 1 hecta = 10.000 m2

  //hàm tính toán chi phí phân bón
  const calculateCost = async (value) => {
    if (!area || !treeCount || !fertilizer) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (parseFloat(area) <= 0 || parseFloat(treeCount) <= 0 || parseFloat(fertilizerPerTree) <=0) {
      Alert.alert("Thông báo", "Đơn vị tính cho cây phải lớn hơn 0.");
      return;
    }

    if (!Number.isInteger(parseFloat(treeCount))) {
      Alert.alert("Thông báo", "Số lượng cây phải là một số nguyên.");
      return;
    }

    try {
      // Lấy data phân bón từ Firestore
      const docRef = doc(db, "fertilizers", fertilizer);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const fertilizerPrice = docSnap.data().pricePerUnit;
        // const numberDays = 365;
        
        
        // Xác định công thức theo loại cây trồng
      let totalCost = 0;
      switch (value) {
        case "saurieng":
          // Công thức cho sầu riêng
          const numberDayforDurian = 365;
          const fertilizerForOneTree = parseFloat(fertilizerPerTree) * numberDayforDurian;
          const fertilizerForTree = parseInt(treeCount) * fertilizerForOneTree;
          totalCost = (fertilizerForTree * fertilizerPrice).toFixed(0);
          const formattedTotalCostSR = Number(totalCost).toLocaleString();
          setActualCost(formattedTotalCostSR);
          break;

        case "cam":
            // Công thức cho cam
          const numberDayforOrange = 365;
          const fertilizerForOrange = parseFloat(fertilizerPerTree) * numberDayforOrange;
          const fertilizerForTreeOrange = parseInt(treeCount) * fertilizerForOrange;
          totalCost = (fertilizerForTreeOrange * fertilizerPrice).toFixed(0);
          const formattedTotalCostC = Number(totalCost).toLocaleString();
          setActualCost(formattedTotalCostC);
          break;

        case "lua":
          // Công thức cho lúa
          const fertilizerForRice = parseInt(treeCount) * parseFloat(fertilizerPerTree) * parseInt(area);
          totalCost = (fertilizerForRice * fertilizerPrice).toFixed(0);
          const formattedTotalCostL = Number(totalCost).toLocaleString();
          setActualCost(formattedTotalCostL);
          break;

        default:
          Alert.alert("Thông báo", "Loại cây trồng không hợp lệ.");
          return;
      }


      } else {
        Alert.alert("Thông báo", "Không tìm thấy thông tin phân bón.");
      }
    } catch (error) {
      console.error("Lỗi khi tính toán chi phí:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi trong quá trình tính toán.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <View>
        <Text style={styles.title}>Kỹ thuật canh tác cây trồng</Text>
      </View>

      {/* Picker */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Chọn loại cây trồng:</Text>
        <Picker
          selectedValue={selectedPlant}
          onValueChange={handlePlantChange}
          style={styles.picker}
        >
          <Picker.Item label="Loại cây trồng:" value="loai" />
          <Picker.Item label="Sầu riêng" value="saurieng" />
          <Picker.Item label="Cam" value="cam" />
          <Picker.Item label="Lúa nước" value="lua" />
        </Picker>
      </View>

      {selectedPlant === "loai" && null}
      {/* Sầu riêng */}
      {selectedPlant === "saurieng" && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Diện tích đất (m2):</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập diện tích đất"
            keyboardType="numeric"
            value={area}
            onChangeText={setArea}
          />

          <Text style={styles.label}>Số cây (Gốc sầu riêng):</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số gốc sầu riêng"
            keyboardType="numeric"
            value={treeCount}
            onChangeText={setTreeCount}
          />

          <Text style={styles.label}>Số phân bón cho mỗi cây (kg/ngày):</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số phân bón cây"
            keyboardType="numeric"
            value={fertilizerPerTree}
            onChangeText={setFertilizerPerTree}
          />

          <Text style={styles.label}>Loại phân bón:</Text>
          <Picker
            selectedValue={fertilizer}
            onValueChange={(itemValue) => setFertilizer(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Chọn loại phân bón (VNĐ/KG)" value="" />
            <Picker.Item label="Phân Hữu Cơ" value="huuco" />
            <Picker.Item label="Phân Lân" value="lan" />
            <Picker.Item label="Phân NPK 20-20-15+TE" value="npk" />
            <Picker.Item label="Phân NPK 16-16-8" value="npk16" />
            <Picker.Item label="Phân Kali" value="kali" />
            <Picker.Item label="Phân Urê" value="dam" />
            <Picker.Item label="Phân Vi Sinh" value="visinh" />
          </Picker>
        </View>
      )}
      {/* Cây Cam */}
      {selectedPlant === "cam" && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Diện tích đất (m2):</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập diện tích đất trồng cam"
            keyboardType="numeric"
            value={area}
            onChangeText={setArea}
          />

          <Text style={styles.label}>Số cây cam:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số cây cam"
            keyboardType="numeric"
            value={treeCount}
            onChangeText={setTreeCount}
          />

          <Text style={styles.label}>Số phân bón cho mỗi cây (kg/ngày):</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số phân bón cây"
            keyboardType="numeric"
            value={fertilizerPerTree}
            onChangeText={setFertilizerPerTree}
          />

          <Text style={styles.label}>Loại phân bón: (KG)</Text>
          <Picker
            selectedValue={fertilizer}
            onValueChange={(itemValue) => setFertilizer(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Chọn loại phân bón (VNĐ/KG)" value="" />
            <Picker.Item label="Phân Hữu Cơ" value="huuco" />
            <Picker.Item label="Phân Lân" value="lan" />
            <Picker.Item label="Phân NPK 20-20-15+TE" value="npk" />
            <Picker.Item label="Phân NPK 16-16-8" value="npk16" />
            <Picker.Item label="Phân Kali" value="kali" />
            <Picker.Item label="Phân Urê" value="dam" />
            <Picker.Item label="Phân Vi Sinh" value="visinh" />
          </Picker>
        </View>
      )}
      {/* Cây Lúa */}
      {selectedPlant === "lua" && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Diện tích đất (m2):</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập diện tích đất trồng lúa"
            keyboardType="numeric"
            value={area}
            onChangeText={setArea}
          />

          <Text style={styles.label}>Số mùa vụ:</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số mùa vụ trên năm"
            keyboardType="numeric"
            value={treeCount}
            onChangeText={setTreeCount}
          />

          <Text style={styles.label}>Lượng phân bón/m2 (kg/m2/vụ):</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số phân bón/m2"
            keyboardType="numeric"
            value={fertilizerPerTree}
            onChangeText={setFertilizerPerTree}
          />

          <Text style={styles.label}>Chọn loại phân bón:</Text>
          <Picker
            selectedValue={fertilizer}
            onValueChange={(itemValue) => setFertilizer(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Chọn loại phân bón (VNĐ/KG)" value="" />
            <Picker.Item label="Phân Hữu Cơ" value="huuco" />
            <Picker.Item label="Phân Lân" value="lan" />
            <Picker.Item label="Phân NPK 20-20-15+TE" value="npk" />
            <Picker.Item label="Phân NPK 16-16-8" value="npk16" />
            <Picker.Item label="Phân Kali" value="kali" />
            <Picker.Item label="Phân Urê" value="dam" />
            <Picker.Item label="Phân Vi Sinh" value="visinh" />
          </Picker>
        </View>
      )}

      {/* Hiểu thị chi phí */}
      {actualCost && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Với diện tích {area}(m2) {"\n"}Ước tính tổng chi phí bạn cần cho 1 năm là{" "}
            {actualCost} (VNĐ)
          </Text>
        </View>
      )}

      {selectedPlant && selectedPlant !== "loai" && (
        <TouchableOpacity style={styles.button} onPress={() => calculateCost(selectedPlant)}>
          <Text style={styles.buttonText}>Ước tính chi phí</Text>
        </TouchableOpacity>
      )}

      {selectedPlant && selectedPlant !== "loai" && (
        <TouchableOpacity style={styles.button} onPress={handleNavigate}>
          <Text style={styles.buttonText}>Xem Kỹ thuật canh tác</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.WHITE,
    marginBottom: 20,
    textAlign: "center",
    backgroundColor: Colors.Green_x2,
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    elevation: 3,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: Colors.GRAY,
    marginBottom: 8,
  },
  picker: {
    height: 50,
    backgroundColor: Colors.GRAY_2,
    borderRadius: 60,
    marginBottom: 10,
    shadowOpacity: 0.3,   
    shadowRadius: 8,       
    elevation: 6,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: Colors.GRAY,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    alignItems: "center",
    padding: 15,
    marginTop: 20,
    marginHorizontal: 30,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: "outfit-bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.GRAY_2,
    borderRadius: 5,
  },
  resultText: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 5,
    padding: 5,
  },
});
