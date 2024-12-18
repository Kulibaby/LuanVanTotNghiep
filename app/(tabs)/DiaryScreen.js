import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, useNavigation } from "expo-router";
import { db, auth } from "./../../configs/FirebaseConfig";
import {
  addDoc,
  collection,
  updateDoc,
  orderBy,
  query,
  deleteDoc,
  doc,
  onSnapshot,
  where,
} from "firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "./../../constants/Colors";
import { scheduleNotification } from "./../../Notification/NotificationConfig";

export default function DiaryScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [taskDescription, setTaskDescription] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateString, setSelectedDateString] = useState(
    selectedDateTime.toLocaleString()
  );
  const [editTask, setEditTask] = useState(null);
  
  const [showIcon, setShowIcon] = useState(false);

  const [currentUserId, setCurrentUserId] = useState(null);

  const [notes, setNotes] = useState([]);
  const [titleNotes, setTitleNotes] = useState("");
  const [descriptionNotes, setDescriptionNotes] = useState("");
  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    const getIdUser = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setCurrentUserId(currentUser.uid);
          console.log("ID người dùng:", currentUser.uid);
        } else {
          console.log("Không tìm thấy người dùng hiện tại!");
        }
      } catch (error) {
        console.log("Lỗi không tìm thấy thông tin người dùng:", error);
      }
    };
    getIdUser();

    if (currentUserId) {
      // Lấy danh sách nhiệm vụ
      const tasksCollection = query(
        collection(db, "tasks"),
        where("userID", "==", currentUserId),
        orderBy("createdAt", "asc")
      );

      const unsubscribeTasks = onSnapshot(tasksCollection, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          dateTime: doc.data().dateTime ? doc.data().dateTime.toDate() : null,
        }));
        setTasks(tasksData);
      });

      // Lấy danh sách ghi chú
      const notesCollection = query(
        collection(db, "notes"),
        where("userID", "==", currentUserId),
      );

      const unsubscribeNotes = onSnapshot(notesCollection, (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotes(notesData);
      });

      return () => {
        unsubscribeTasks();
        unsubscribeNotes();
      };
    }
  }, [currentUserId]);

  const saveTask = async () => {
    if (!taskDescription.trim()) {
      Alert.alert("Nội dung nội nhiệm vụ không được để trống!");
      return;
    }

    try {
      if (editTask) {
        await updateDoc(doc(db, "tasks", editTask.id), {
          description: taskDescription,
          dateTime:
            selectedDateTime instanceof Date ? selectedDateTime : new Date(),
          userID: currentUserId,
        });
        ToastAndroid.show("Cập nhật nhiệm vụ thành công!", ToastAndroid.SHORT);
      } else {
        await addDoc(collection(db, "tasks"), {
          description: taskDescription,
          dateTime:
            selectedDateTime instanceof Date ? selectedDateTime : new Date(),
          createdAt: new Date(),
          userID: currentUserId,
          isCompleted: true,
        });

        // Gửi thông báo sau khi tạo mới nhiệm vụ
        await scheduleNotification(
          "Nhắc nhở nhiệm vụ",
          `Bạn có một nhiệm vụ: ${taskDescription}`,
          selectedDateTime
        );

        ToastAndroid.show("Lưu nhiệm vụ thành công!", ToastAndroid.SHORT);
      }

      setTaskDescription("");
      setSelectedDateString(new Date().toLocaleString());
      setEditTask(null);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Không thể lưu nhiệm vụ. Vui lòng thử lại.");
    }
  };

  const handleConfirm = (date) => {
    setSelectedDateTime(date);
    setSelectedDateString(date.toLocaleString());
    setShowDatePicker(false);
  };

  const openEditModalTask = (task) => {
    setEditTask(task);
    setTaskDescription(task.description);
    setSelectedDateTime(task.dateTime || new Date());
    setModalVisible(true);
  };

  const deleteTask = async (taskId) => {
    Alert.alert("Xác nhận xóa", "Bạn có muốn xóa nhiệm vụ này không?", [
      {
        text: "Hủy",
        onPress: () => console.log("Hủy xóa nhiệm vụ"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "tasks", taskId));
            setTasks((prevTasks) =>
              prevTasks.filter((task) => task.id !== taskId)
            );
            ToastAndroid.show("Xóa nhiệm vụ thành công!", ToastAndroid.SHORT);
          } catch (error) {
            console.error(error);
            Alert.alert("Không thể xóa nhiệm vụ. Vui lòng thử lại.");
          }
        },
      },
    ]);
  };

  const handleCheckTask = async (task) => {
    if (task.isCompleted) {
      Alert.alert(
        "Hoàn thành nhiệm vụ hôm nay",
        "Bạn có muốn xóa nhiệm vụ đã hoàn thành này không?",
        [
          {
            text: "không",
            onPress: () => {
              ToastAndroid.show("Nhiệm vụ đã hoàn thành", ToastAndroid.SHORT);
            },
            style: "cancel",
          },
          {
            text: "Có",
            onPress: async () => {
              try {
                await deleteDoc(doc(db, "tasks", task.id));
                setTasks((prevTasks) =>
                  prevTasks.filter((t) => t.id !== task.id)
                );
                ToastAndroid.show(
                  "Xóa nhiệm vụ thành công!",
                  ToastAndroid.SHORT
                );
              } catch (error) {
                console.error(error);
                Alert.alert("Không thể xóa nhiệm vụ. Vui lòng thử lại.");
              }
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Hãy hoàn thành nhiệm vụ!",
        "Bạn phải hoàn thành nhiệm vụ này trước khi xóa."
      );
    }
  };

  //modal notes
  const [isModalVisibleNotes, setModalVisibleNotes] = useState(false);
  // const [selectedNote, setSelectedNote] = useState(null);

  const openEditModalNote = (note) => {
    setEditNote(note);
    setTitleNotes(note.titleNote);
    setDescriptionNotes(note.descriptionNote);
    setModalVisibleNotes(true);
  };

  //notes
  const saveNotes = async () => {

    if (!titleNotes.trim() || !descriptionNotes.trim()) {
      Alert.alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      if (editNote) {
        await updateDoc(doc(db, "notes", editNote.id), {
          titleNote: titleNotes,
          descriptionNote: descriptionNotes,
        });
        ToastAndroid.show("Cập nhật ghi chú thành công!", ToastAndroid.SHORT);
        
      } else {
        await addDoc(collection(db, 'notes'), {
          titleNote: titleNotes,
          descriptionNote: descriptionNotes,
          userID: currentUserId,
          isCompleted: true,
        });

        ToastAndroid.show("Lưu ghi chú thành công!", ToastAndroid.SHORT);
      }

      setTitleNotes('');
      setDescriptionNotes('');
      setEditNote(null);
      setModalVisibleNotes(false);

    } catch (error) {
      console.error(error);
      Alert.alert("Không thể lưu. Vui lòng thử lại.");
    }
  };

  const deleteNote = async (noteId) => {
    Alert.alert("Xác nhận xóa", "Bạn có muốn xóa ghi chú này không?", [
      {
        text: "Hủy",
        onPress: () => console.log("Hủy xóa ghi chú"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "notes", noteId));
            setNotes((prevNotes) =>
              prevNotes.filter((note) => note.id !== noteId)
            );
            ToastAndroid.show("Xóa ghi chú thành công!", ToastAndroid.SHORT);
          } catch (error) {
            console.error(error);
            Alert.alert("Không thể xóa ghi chú. Vui lòng thử lại.");
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Notes */}
      <View style={styles.containerNotes}>
        {/* Notes list */}
        <Text style={styles.title}>Danh sách ghi chú</Text>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <View
                style={styles.containerTaskInfo}
              >
                <Text style={styles.noteTitle}>Tiêu đề: {item.titleNote}</Text>
                <Text style={styles.noteText}>
                  Nội dung:{" "}
                  {item.descriptionNote.length > 50
                    ? `${item.descriptionNote.substring(0, 50)}...`
                    : item.descriptionNote}
                </Text>
              </View>

              <View style={styles.containerIconTask}>
                {/* Nút chỉnh sửa */}
                <TouchableOpacity
                  style={styles.iconEdit}
                  onPress={() => openEditModalNote(item)}
                >
                  {/* <Ionicons name="create-sharp" size={24} color="blue" /> */}
                  <Ionicons name="pencil-sharp" size={24} color="white" />
                </TouchableOpacity>

                {/* Nút xóa */}
                <TouchableOpacity
                  style={styles.iconDelete}
                  onPress={() => deleteNote(item.id)}
                >
                  <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Modal ghi chu */}
      <Modal
        visible={isModalVisibleNotes}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.containerNoteContent}>
            <View style={styles.mainModal}>
              <TextInput
                placeholder="Tiêu đề"
                value={titleNotes}
                onChangeText={setTitleNotes}
                style={styles.titleModal}
              />

              <TextInput
                placeholder="Nội dung"
                value={descriptionNotes}
                multiline={true}
                onChangeText={setDescriptionNotes}
                style={styles.descriptionNote}
              />
            </View>

            <View style={styles.containerModalNotes}>
              {/* Lưu note */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={saveNotes}
              >
                <Text style={styles.textButtonNote}>Lưu ghi chú</Text>
              </TouchableOpacity>

              {/* Hủy note */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() =>{
                  setModalVisibleNotes(false)
                  setTitleNotes('');
                  setDescriptionNotes('');
                  setEditNote(null);
                }}
              >
                <Text style={styles.textButtonNote}>Hủy</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.containerTaskList}>
        {/* Task List */}
        <Text style={styles.title}>Nhiệm vụ</Text>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              {/* checkbox */}
              <View style={styles.containerCheckbox}>
                <TouchableOpacity
                  style={styles.checkBox}
                  onPress={() => handleCheckTask(item)}
                >
                  <Ionicons name="checkbox-sharp" size={30} color="green" />
                </TouchableOpacity>
              </View>

              <View style={styles.containerTaskInfo}>
                <Text style={styles.taskText}>
                  Nhiệm vụ: {item.description}
                </Text>
                <Text style={styles.taskText}>
                  Đặt thông báo:{" "}
                  {item.dateTime
                    ? item.dateTime.toLocaleString()
                    : "Thời gian không hợp lệ"}
                </Text>
              </View>

              <View style={styles.containerIconTask}>
                {/* Nút chỉnh sửa */}
                <TouchableOpacity
                  onPress={() => openEditModalTask(item)}
                  style={styles.iconEdit}
                >
                  {/* <Ionicons name="create-sharp" size={24} color="blue" /> */}
                  <Ionicons name="pencil-sharp" size={24} color="white" />
                </TouchableOpacity>

                {/* Nút xóa */}
                <TouchableOpacity
                  onPress={() => deleteTask(item.id)}
                  style={styles.iconDelete}
                >
                  <Ionicons name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) =>
            item.id || Math.random().toString(36).substring(7)
          }

          // ListHeaderComponent={() => (
          //     <Text style={styles.title}>Nhiệm vụ</Text>
          // )}
        />
      </View>

      {/* chọn chức năng */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowIcon(!showIcon)}
      >
        <Ionicons name="add-circle-sharp" size={60} color={Colors.Green_x2} />
      </TouchableOpacity>

      {/* show icon */}
      {showIcon && (
        <View style={styles.iconContainer}>
          {/* tao nhiem vu */}
          <TouchableOpacity
            style={styles.createIcon}
            onPress={() => {
              setShowIcon(false);
              setModalVisible(true);
            }}
          >
            <Ionicons name="create-sharp" size={24} color="green" />
            <Text>Tạo nhiệm vụ</Text>
          </TouchableOpacity>

          {/* tao ghi chu */}
          <TouchableOpacity
            style={styles.createIcon}
            onPress={() => {
              setShowIcon(false);
              setModalVisibleNotes(true);
            }}
          >
            <Ionicons name="document-text-sharp" size={24} color="blue" />
            <Text>Tạo Ghi chú</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* modal nhiệm vụ */}
      <Modal 
        visible={modalVisible} 
        animationType="slide" 
        transparent={true}
      >
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

              <View
                onPress={() => setShowDatePicker(true)}
                style={{ marginTop: 10 }}
              >
                <Text
                  style={{
                    padding: 10,
                    borderColor: Colors.GRAY,
                    borderWidth: 1,
                    borderRadius: 10,
                  }}
                >
                  {selectedDateString || "Chọn ngày"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
              >
                <Ionicons name="calendar" size={40} color="black" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={saveTask} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Lưu nhiệm vụ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false)
                setTaskDescription("");
                setSelectedDateString(new Date().toLocaleString());
                setEditTask(null);
              }}
              style={styles.cancelButton}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.WHITE,
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: Colors.Green_x2,
    padding: 15,
    marginTop: 20,
    borderRadius: 5,
    elevation: 3,
  },
  containerTaskList: {
    flex: 1,
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 16,
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    marginVertical: 5,
    backgroundColor: "#eaeaea",
    borderRadius: 5,
  },
  containerTaskInfo: {
    flex: 1,
    marginRight: 10,
  },
  taskText: {
    fontSize: 16,
    marginRight: 5,
    marginLeft: 10,
    color: Colors.PRIMARY,
    marginTop: 5,
  },
  containerIconTask: {
    alignItems: "center",
    padding: 5,
  },
  checkBox: {
    marginLeft: 10,
  },
  containerCheckbox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  iconEdit: {
    marginVertical: 8,
    alignItems: "center",
    padding: 3,
    backgroundColor: Colors.Blue,
    borderRadius: 4,
  },
  iconDelete: {
    marginVertical: 8,
    alignItems: "center",
    padding: 3,
    backgroundColor: Colors.Red,
    borderRadius: 4,
  },
  addButton: {
    position: "absolute",
    alignSelf: "center",
    bottom: 10,
    zIndex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateButton: {
    marginVertical: 10,
    alignItems: "center",
    marginRight: 20,
  },
  saveButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: "outfit-medium",
    color: Colors.WHITE,
  },
  cancelButton: {
    backgroundColor: Colors.PRIMARY,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "outfit-medium",
    color: Colors.WHITE,
  },
  iconContainer: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center",
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
  },
  containerNotes: {
    flex: 1,
    height: "50%",
    padding: 10,
  },
  createIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: Colors.Green_YL,
    padding: 15,
    borderRadius: 8,
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 5,
    marginLeft: 10,
    color: Colors.PRIMARY,
    marginTop: 5,
  },
  noteText: {
    fontSize: 16,
    marginRight: 5,
    marginLeft: 10,
    color: Colors.PRIMARY,
    marginTop: 5,
  },
  containerNoteContent: {
    minWidth: '80%',
    padding: 16,
    backgroundColor: Colors.Green_W,
    borderRadius: 12,
  },
  mainModal: {
    minHeight: 300,
    width: 300,
    backgroundColor: Colors.Green_x1,
    borderRadius: 12,
    padding: 10,
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  titleModal: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center",
  },
  descriptionNote: {
    textAlignVertical: "top",
    fontSize: 20,
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 10,
    borderRadius: 6,
    flexWrap: 'wrap',
    minHeight: 220,
    minWidth: '100%',
    multiline: true,
  },
  containerModalNotes: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: Colors.Green_x2,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  modalButtonDelete: {
    backgroundColor: Colors.Red,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  textButtonNote: {
    fontSize: 16,
    fontFamily: "outfit-bold",
    textAlign: "center",
    color: Colors.WHITE,
    paddingHorizontal: 2,
  },
  
});
