import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { database } from "../../config/firebase";
import { ref, onValue, update } from "firebase/database";

const AdminRiwayatTicket = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const ticketsRef = ref(database, "kontak");
    onValue(ticketsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ticketList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTickets(ticketList);
      } else {
        setTickets([]);
        Alert.alert("Tidak ada data");
        navigation.navigate("AdminScreen"); // Navigate back to Admin if no data
      }
    });
  }, [navigation]);

  const handleUpdateProgress = (id, status) => {
    const ticketRef = ref(database, `kontak/${id}`);
    update(ticketRef, { progress: status })
      .then(() => {
        Alert.alert("Sukses", `Progress berhasil diubah menjadi ${status}`);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.nama}</Text>
            <Text>Departement: {item.email}</Text>
            <Text>Lokasi Ruangan: {item.Location}</Text>
            <Text>Jenis Masalah: {item.Problem}</Text>
            <Text>Deskripsi: {item.alamat}</Text>
            <Text>Jenis Progress: {item.progress}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleUpdateProgress(item.id, "on going")}>
                <Text style={styles.button}>on going</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleUpdateProgress(item.id, "end progress")}>
                <Text style={styles.button}>end proses</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    
    marginTop: 10,
  },

  button: {
    backgroundColor: "#09d4c8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
});

export default AdminRiwayatTicket;
