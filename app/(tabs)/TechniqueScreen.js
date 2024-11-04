import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Colors } from './../../constants/Colors'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export default function TechniqueScreen() {

    const navigation = useNavigation();

    const [selectedPlant, setSelectedPlant] = useState(null);
    const [area, setArea] = useState('');
    const [treeCount, setTreeCount] = useState('');
    const [fertilizer, setFertilizer] = useState('');
    const [estimatedCost, setEstimatedCost] = useState('');

    //Hàm điều hướng
    const handleNavigate = () => {
        console.log("Selected Plant:", selectedPlant);
        if (!selectedPlant) {
            Alert.alert("Thông báo", "Vui lòng chọn loại cây trồng trước khi ước tính & kỹ thuật.");
        } else {
            navigation.navigate('plantSpecies/durian'); 
        }
    };
    // Hàm xử lý khi chọn loại cây
    const handlePlantChange = (itemValue) => {
        if (itemValue === null) {
            setSelectedPlant(null);
            setArea('');
            setTreeCount('');
            setFertilizer('');
            setEstimatedCost('');
        } else {
            setSelectedPlant(itemValue);
        }
    };

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
                <Picker.Item label="Loại cây trồng:" value={null} />
                <Picker.Item label="Sầu riêng" value="saurieng" />
                <Picker.Item label="Cam" value="cam" />
            </Picker>
        </View>

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
                <TextInput
                    style={styles.input}
                    placeholder="Nhập loại phân bón"
                    value={fertilizer}
                    onChangeText={setFertilizer}
                />

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


        {selectedPlant && (
            <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                <Text style={styles.buttonText}>Ước tính & kỹ thuật</Text>
            </TouchableOpacity>
        )}
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
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
        color: '#555',
        marginBottom: 8,
    },
    picker: {
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
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
        color: '#fff',
        fontSize: 18,
        fontFamily: 'outfit-bold'
    },
});