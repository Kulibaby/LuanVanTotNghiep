import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db } from './../../configs/FirebaseConfig';
import { addDoc, collection, getDocs, orderBy, query, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from './../../constants/Colors';

export default function DiaryScreen() {
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDateString, setSelectedDateString] = useState(selectedDateTime.toLocaleString());

    useEffect(() => {
        const tasksCollection = query(collection(db, 'tasks'), orderBy('createdAt', 'asc'));
        const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
            const tasksData = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
                dateTime: doc.data().dateTime ? doc.data().dateTime.toDate() : null,
            }));
            console.log("Tasks data with ID:", tasksData);
        });
        return () => unsubscribe();
    }, []);

    const saveTask = async () => {

        if (!taskDescription.trim()) {
            Alert.alert("Nội dung nội nhiệm vụ không được để trống!");
            return;
        }

        try {
            if (taskDescription.trim()) {
                const docRef = await addDoc(collection(db, 'tasks'), {
                    description: taskDescription,
                    dateTime: selectedDateTime instanceof Date ? selectedDateTime : new Date(),
                    createdAt: new Date(),
                });

                const newTask = {
                    description: taskDescription,
                    dateTime: selectedDateTime,
                    createdAt: new Date(),
                    id: docRef.id, // Sử dụng ID từ Firestore
                };

                // Cập nhật danh sách nhiệm vụ và sắp xếp chúng theo thời gian tạo
                setTasks(prevTasks => [...prevTasks, newTask].sort((a, b) => a.createdAt - b.createdAt));
                
                setTaskDescription('');
                setSelectedDateString(new Date().toLocaleString());
                setModalVisible(false);
            }
        } catch (error) {
            console.error("Error saving task:", error);
            Alert.alert("Không thể lưu nhiệm vụ. Vui lòng thử lại.");
        }
    };

    const handleConfirm = (date) => {
        setSelectedDateTime(date);
        setSelectedDateString(date.toLocaleString());
        setShowDatePicker(false);
    };

    const deleteTask = async (taskId) => {
        try {
            await deleteDoc(doc(db, 'tasks', taskId));
            // Xoá khỏi trạng thái `tasks` để cập nhật danh sách nhiệm vụ
            setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
            Alert.alert("Không thể xoá nhiệm vụ. Vui lòng thử lại.");
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Nhiệm vụ hằng ngày</Text>
            </View>

            <View style={styles.containerTaskList}>
                {/* Task List */}
                <FlatList
                    data={tasks}
                    renderItem={({ item }) => (
                        <View style={styles.taskItem}>
                            <Text style={styles.taskText}>{item.description}</Text>
                            <Text style={styles.taskText}>
                                {/* {item.dateTime && typeof item.dateTime.toDate === 'function'
                                ? item.dateTime.toDate().toLocaleString()
                                : 'Thời gian không hợp lệ'} */}
                                {item.dateTime ? item.dateTime.toLocaleString() : 'Thời gian không hợp lệ'}
                            </Text>
                            {/* Nút Xóa */}
                            <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
                                <Ionicons name="trash" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item.id || Math.random().toString(36).substring(7)}
                />
            </View>

            {/* Create Task Button */}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                <Ionicons name="add-circle-sharp" size={60} color="black" />
            </TouchableOpacity>

            {/* Task Creation Modal */}
            <Modal visible={modalVisible} animationType='slide' transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            placeholder="Nội dung nhiệm vụ"
                            value={taskDescription}
                            onChangeText={setTaskDescription}
                            style={styles.input}
                        />
                        
                        <View style={styles.containerButton}>
                        

                            {/* Date-Time Picker */}
                            <DateTimePickerModal
                                isVisible={showDatePicker}
                                mode="datetime"
                                date={selectedDateTime}
                                onConfirm={handleConfirm}
                                onCancel={() => setShowDatePicker(false)}
                            />

                            <View onPress={() => setShowDatePicker(true)} style={{ marginTop: 10,}}>
                                <Text style={{
                                    padding: 10,
                                    borderColor: Colors.GRAY,
                                    borderWidth: 1,
                                    borderRadius: 10
                                }}>
                                    {selectedDateString || "Chọn ngày"}
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
                                <Ionicons name="calendar" size={40} color="black" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={saveTask} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Lưu nhiệm vụ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    title: {
        fontSize: 20,
        fontFamily: 'outfit-bold',
        textAlign: 'center',
        backgroundColor: Colors.Green,
        color: Colors.WHITE,
        padding: 20,
        marginTop: 30,
    },
    containerTaskList: {
        padding: 20,
    },
    modalContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)' 
    },
    modalContent: { 
        backgroundColor: '#fff', 
        padding: 20, 
        borderRadius: 10, 
        width: '80%' 
    },
    taskItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: 10, 
        marginVertical: 5, 
        backgroundColor: '#eaeaea', 
        borderRadius: 5,
    },
    taskText: { 
        fontSize: 16, 
        flex: 1,
        marginRight: 10,
    },
    deleteButton: {
        width: 40,
        height: 40,      
        backgroundColor: Colors.Red, 
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
    },
    addButton: { 
        position: 'absolute',
        alignSelf: 'center', 
        bottom: 10,
        zIndex: 1,
    },
    input: { 
        borderWidth: 1, 
        borderColor: Colors.GRAY, 
        padding: 10, 
        marginBottom: 10, 
        borderRadius: 10, 
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',  
        alignItems: 'center',     
    },
    dateButton: { 
        marginVertical: 10, 
        alignItems: 'center',
        marginRight: 20,
    },
    saveButton: {
        backgroundColor: Colors.PRIMARY, 
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
    },
    saveButtonText: { 
        fontSize: 16,
        fontFamily: 'outfit-medium',
        color: Colors.WHITE,  
    },
    cancelButton: {
        backgroundColor: Colors.PRIMARY, 
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 10,
    },
    buttonText: { 
        fontSize: 16,
        fontFamily: 'outfit-medium',
        color: Colors.WHITE,
    },
    
});
