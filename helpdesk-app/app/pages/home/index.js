import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  Image,
} from "react-native";
import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";

const Home = ({ navigation }) => {
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
      }
    });
  }, []);

  const handleNavigateToRiwayat = () => {
    if (tickets.length === 0) {
      Alert.alert("Data Kosong", "Tidak ada data tiket untuk ditampilkan.");
    } else {
      navigation.navigate("RiwayatTicket");
    }
  };
  const handleLogOut = () => {
    Alert.alert(
      "Logout",
      "Apakah Anda yakin ingin keluar?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("LoginScreen") },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.helpdesk}>
        <Text style={styles.THelpdesk}>IBIK Help Desk</Text>
        <View>
          <Image source={require("../images/ibik.png")} style={styles.image} />
        </View>
      </View>
      <Text style={styles.Utama}>Selamat Datang, User</Text>
      <View >
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Tambah")}
        >
          <Text style={styles.buttonText}>Tambah Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleNavigateToRiwayat}
        >
          <Text style={styles.buttonText}>Riwayat Ticket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogOut}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  Utama: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#09d4c8",
    padding: 10,
    margin: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  Logout: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#09d4c8",
    borderRadius: 5,
  },
  helpdesk: {
    marginTop: -230,
    marginBottom: 200,
    backgroundColor: "#09d4c8",
    width: "100%",
    height: 75,
    paddingTop: 10,
  },

  THelpdesk: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: "bold",
    alignSelf: "center",
    color: "white",
  },

  image: {
    width: 50,
    height: 50,

    marginTop: -40,
    marginLeft: 20,
  },
});

export default Home;
