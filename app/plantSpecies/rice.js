import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "./../../constants/Colors";
import { db, auth } from "./../../configs/FirebaseConfig";
import { collection, doc, getDoc } from "firebase/firestore";

export default function Rice() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShows: true,
      headerTransparent: true,
      headerTitle: "Kỹ thuật trồng Lúa nước",
    });
  }, []);

  const [contents, setContents] = useState([]);

  const plantSpeciesData = async () => {
    try {
      const docRef = doc(db, "plantSpecies", "uid.rice");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContents(docSnap.data().contents);
      } else {
        console.log("Document does not exist!");
      }
    } catch (error) {
      console.error("Lỗi truy cập dữ liệu: ", error);
    }
  };

  useEffect(() => {
    plantSpeciesData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      <ScrollView style={styles.containerScroll}>
        {contents.map((item, index) => (
          <View key={index} style={styles.contentContainer}>
            <Text style={styles.contentTitle}>{item.title}</Text>
            <Text style={styles.contentDescription}>{item.description}</Text>
            <Text style={styles.contentDescription}>{item.description1}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    backgroundColor: Colors.Green_W,
    width: "100%",
    height: 90,
  },
  containerScroll: {
    padding: 20,
  },
  contentContainer: {
    marginBottom: 20,
  },
  contentTitle: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    marginBottom: 5,
    color: Colors.PRIMARY,
  },
  contentDescription: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    lineHeight: 22,
    color: Colors.PRIMARY,
    marginBottom: 5,
  },
});
