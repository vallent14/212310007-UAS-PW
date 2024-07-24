import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import { database } from "../../config/firebase";
import { ref, onValue, update, remove } from "firebase/database";

const RiwayatTicket = ({ navigation }) => {
  const [tickets, setTickets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [Location, setLocation] = useState("");
  const [Problem, setProblem] = useState("");
  const [progress, setProgress] = useState("belum di lihat");

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
        navigation.navigate("Tambah"); // Navigate back to Home if no data
      }
    });
  }, [navigation]);

  const handleUpdate = (ticket) => {
    setSelectedTicket(ticket);
    setNama(ticket.nama);
    setEmail(ticket.email);
    setAlamat(ticket.alamat);
    setLocation(ticket.Location);
    setProblem(ticket.Problem);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (selectedTicket) {
      const ticketRef = ref(database, `kontak/${selectedTicket.id}`);
      update(ticketRef, { nama, email, alamat, Location, Problem })
        .then(() => {
          Alert.alert("Sukses", "Data berhasil diperbarui");
          setModalVisible(false);
          setSelectedTicket(null);
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    }
  };

  const handleDelete = (id) => {
    const ticketRef = ref(database, `kontak/${id}`);
    remove(ticketRef).then(() => {
      Alert.alert("Sukses", "Data berhasil dihapus");
      if (tickets.length === 1) {
        navigation.navigate("RiwayatTicket"); // Navigate back to Home if all data is deleted
      }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.content}>
              <Text style={styles.title}>{item.nama}</Text>
              <Text>Departement: {item.email}</Text>
              <Text>Lokasi Ruangan: {item.alamat}</Text>
              <Text>Jenis Masalah: {item.Location}</Text>
              <Text>Deskripsi: {item.Problem}</Text>
              <Text>Jenis Progress: {item.progress}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleUpdate(item)}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>UPDATE DATA</Text>
          <Text style={styles.TextField}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama"
            value={nama}
            onChangeText={setNama}
          />
          <Text style={styles.TextField}>Departement</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.TextField}>Lokasi Ruangan</Text>
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            value={alamat}
            onChangeText={setAlamat}
          />
          <Text style={styles.TextField}>Jenis Masalah</Text>
          <TextInput
            style={styles.input}
            placeholder="Problem"
            value={Problem}
            onChangeText={setProblem}
          />
          <Text style={styles.TextField}>Deskripsi</Text>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={Location}
            onChangeText={setLocation}
          />
          <View style={styles.buttonContainers}>
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.buttonTexts}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => setModalVisible(false)}>
              <Text style={styles.buttonTexts}>Cancel</Text>
            </TouchableOpacity>
         
          </View>
        </View>
      </Modal>
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
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
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
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center", // Center the text vertically
    marginHorizontal: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center", // Center the text horizontally
  },
  content: {
    marginBottom: 10,
  },
  buttonContainers: {
    flexDirection: "row",
    
    marginTop: 10,
    justifyContent: "space-around",
    height: 150,
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    
    
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
    alignSelf: "center",
  },
  TextField: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  buttonTexts: {
    backgroundColor: "#09d4c8",
    fontWeight: "bold",
    allignSelf: "center",
    width: 100,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    color: "black",

  }


});

export default RiwayatTicket;
