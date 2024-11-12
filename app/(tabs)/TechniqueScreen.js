import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Colors } from './../../constants/Colors'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { db } from './../../configs/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';


export default function TechniqueScreen() {

    const navigation = useNavigation();

    const [selectedPlant, setSelectedPlant] = useState(null);
    const [area, setArea] = useState('');
    const [treeCount, setTreeCount] = useState('');
    const [fertilizer, setFertilizer] = useState('');
    const [estimatedCost, setEstimatedCost] = useState('');
    const  [actualCost, setActualCost] = useState(null);

    useEffect(() => {
        setArea('');
        setTreeCount('');
        setFertilizer('');
        setEstimatedCost('');
        setActualCost(null);
    }, [selectedPlant])

    //router điều hướng
    const plantRouter= {
        saurieng: 'plantSpecies/durian',
        cam: 'plantSpecies/orange',
        lua: 'plantSpecies/rice',
    };

    //Hàm điều hướng
    const handleNavigate = () => {
        console.log("Selected Plant: ", selectedPlant);
        if (!selectedPlant || selectedPlant === "loai") {
            Alert.alert("Thông báo", "Vui lòng chọn loại cây trồng trước khi ước tính & kỹ thuật.");
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
            setArea('');
            setTreeCount('');
            setFertilizer('');
            setEstimatedCost('');
        } else {
            setSelectedPlant(itemValue);
        }
    };

    // Đơn vị tính 1 hecta = 10.000 m2

    //hàm tính toán chi phí phân bón
    const calculateCost = async () => {
        if (!area || !treeCount || !fertilizer) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }
        try {
            // Lấy data phân bón từ Firestore
            const docRef = doc(db, "fertilizers", fertilizer); 
            const docSnap = await getDoc(docRef); 
    
            if (docSnap.exists()) {
                const fertilizerPrice = docSnap.data().pricePerUnit;
                const totalCost = (parseFloat(area) * parseFloat(treeCount) * fertilizerPrice).toFixed(0);
                setActualCost(totalCost);
            } else {
                Alert.alert("Thông báo", "Không tìm thấy thông tin phân bón.");
            }
        } catch (error) {
            console.error("Lỗi khi tính toán chi phí:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi trong quá trình tính toán.");
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
        {/* Title */}
        <Text style={styles.title}>Kỹ thuật canh tác cây trồng</Text>
        
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
                <Picker.Item label="Lúa nước" value="lua"/>
            </Picker>
        </View>

        {selectedPlant === "loai" && (null)}

        {selectedPlant === 'saurieng' && (
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Diện tích đất (m²):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập diện tích đất"
                    keyboardType="numeric"
                    value={area}
                    onChangeText={setArea}
                />

                <Text style={styles.label}>Số gốc sầu riêng:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập số gốc sầu riêng"
                    keyboardType="numeric"
                    value={treeCount}
                    onChangeText={setTreeCount}
                />

                <Text style={styles.label}>Loại phân bón:</Text>
                <Picker
                  selectedValue={fertilizer}
                  onValueChange={(itemValue) => setFertilizer(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Chọn loại phân bón" value="" />
                  <Picker.Item label="Hữu cơ" value="huuco" />
                  <Picker.Item label="NPK" value="npk" />
                  <Picker.Item label="Vi lượng" value="viluong" />
                </Picker>

                <Text style={styles.label}>Chi phí ước tính khi sử dụng phân bón (VNĐ):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập chi phí ước tính"
                    keyboardType="numeric"
                    value={estimatedCost}
                    onChangeText={setEstimatedCost}
                />
            </View>
        )}

        {selectedPlant === "cam" && (
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Diện tích đất (hecta):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập diện tích đất trồng cam"
                    keyboardType="numeric"
                    value={area}
                    onChangeText={setArea}
                />

                <Text style={styles.label}>Số gốc sầu riêng:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập số gốc sầu riêng"
                    keyboardType="numeric"
                    value={treeCount}
                    onChangeText={setTreeCount}
                />

                <Text style={styles.label}>Loại phân bón:</Text>
                <Picker
                  selectedValue={fertilizer}
                  onValueChange={(itemValue) => setFertilizer(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Chọn loại phân bón" value="" />
                  <Picker.Item label="Hữu cơ" value="huuco" />
                  <Picker.Item label="Lân" value="lan" />
                  <Picker.Item label="NPK" value="npk" />
                </Picker>

                <Text style={styles.label}>Chi phí ước tính khi sử dụng phân bón (VNĐ):</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nhập chi phí ước tính"
                    keyboardType="numeric"
                    value={estimatedCost}
                    onChangeText={setEstimatedCost}
                />
            </View>
        )}

        {selectedPlant === "lua" && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Diện tích đất (hecta):</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập diện tích đất trồng lúa"
              keyboardType="numeric"
              value={area}
              onChangeText={setArea}
          />

            <Text style={styles.label}>Giống lúa</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập giống lúa"
              keyboardType="numeric"
              value={treeCount}
              onChangeText={setTreeCount}
            />

            <Text style={styles.label}>Loại phân bón:</Text>
            <Picker
              selectedValue={fertilizer}
              onValueChange={(itemValue) => setFertilizer(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Chọn loại phân bón" value="" />
              <Picker.Item label="Đạm" value="dam" />
              <Picker.Item label="Lân" value="lan" />
              <Picker.Item label="Kali" value="kali" />
            </Picker>

            <Text style={styles.label}>Chi phí ước tính (VNĐ):</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập chi phí ước tính"
              keyboardType="numeric"
              value={estimatedCost}
              onChangeText={setEstimatedCost}
            />
          </View>
        )}

        {/* Hiểu thị chi phí */}
        {actualCost && (
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                    Chi phí ước tính: {estimatedCost} VNĐ
                </Text>
                <Text style={styles.resultText}>
                    Kết quả thực tế: {actualCost} VNĐ
                </Text>
            </View>
        )}

        {selectedPlant && selectedPlant !== "loai" && (
            <TouchableOpacity style={styles.button} onPress={calculateCost}>
                <Text style={styles.buttonText}>Ước tính chi phí</Text>
            </TouchableOpacity>
        )}

        {selectedPlant && selectedPlant !== "loai" && (
            <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                <Text style={styles.buttonText}>Kỹ thuật canh tác</Text>
            </TouchableOpacity>
        )}

        
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: Colors.WHITE,
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.PRIMARY,
        marginBottom: 20,
        textAlign: 'center',
        backgroundColor: Colors.Green_YL,
        padding: 15,
        marginTop: 20,
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
        borderRadius: 5,
        marginBottom: 20,
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
        alignItems: 'center',
        padding: 15,
        marginTop: 20,
        marginHorizontal: 30,
    },
    buttonText: {
        color: Colors.WHITE,
        fontSize: 18,
        fontFamily: 'outfit-bold'
    },
    resultContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: Colors.GRAY_2,
        borderRadius: 5,
    },
    resultText: {
        fontFamily: 'outfit-medium',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
        padding: 5,
    },
});