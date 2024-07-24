import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import InputData from "../../component/InputData";
import { database } from "../../config/firebase";
import { ref, push, onValue } from 'firebase/database';

export class Tambah extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      nama: '',
      email: '',
      alamat: '',
      Location: '',
      Problem: '',
      tickets: [],
    };
  }

  componentDidMount() {
    this.loadTickets();
  }

  loadTickets = () => {
    const Referensi = ref(database, 'kontak');
    onValue(Referensi, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tiketArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        this.setState({ tickets: tiketArray });
      } else {
        this.setState({ tickets: [] });
      }
    });
  };

  onChangeText = (namaState, value) => {
    this.setState({ [namaState]: value });
  }

  onSubmit = () => {
    if (this.state.nama && this.state.alamat && this.state.email && this.state.Location && this.state.Problem) {
      const Referensi = ref(database, 'kontak');
      const kontak = {
        nama: this.state.nama,
        email: this.state.email,
        alamat: this.state.alamat,
        Location: this.state.Location,
        Problem: this.state.Problem,
        progress: 'belum dilihat', // Tambahkan field progress dengan nilai default
      };

      push(Referensi, kontak)
        .then(() => {
          Alert.alert("Sukses", "Data berhasil ditambahkan", [
            { text: "OK", onPress: () => this.props.navigation.navigate("RiwayatTicket") },
          ]);
          this.loadTickets(); // Refresh tickets after successful submission
          this.setState({
            nama: '',
            email: '',
            alamat: '',
            Location: '',
            Problem: ''
          }); // Clear the input fields
        })
        .catch((error) => {
          console.log("Error:", error);
        });

    } else {
      Alert.alert("Peringatan", "Data harus diisi semua", [
        { text: "OK" },
      ]);
    }
  }

  handleNavigateToRiwayat = () => {
    if (this.state.tickets.length === 0) {
      Alert.alert("Data Kosong", "Tidak ada data tiket untuk ditampilkan.");
    } else {
      this.props.navigation.navigate("RiwayatTicket");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={style.uwu}>
            <TouchableOpacity style={style.buttonRiwayat} onPress={this.handleNavigateToRiwayat}>
              <Text style={{fontWeight: 'bold'}}>Riwayat Ticket</Text>
            </TouchableOpacity>
            <InputData label="Subject" placeholder="Subject" onChangeText={this.onChangeText} value={this.state.nama} namaState="nama" />
            <InputData label="Departement" placeholder="Departement" onChangeText={this.onChangeText} value={this.state.email} namaState="email" />
            <InputData label="Lokasi Ruangan" placeholder="Lokasi Ruangan" onChangeText={this.onChangeText} value={this.state.Location} namaState="Location" />
            <InputData label="Jenis Masalah" placeholder="Jenis Masalah" onChangeText={this.onChangeText} value={this.state.Problem} namaState="Problem" />
            <InputData label="Deskripsi" placeholder="Deskripsi" isTextArea={true} onChangeText={this.onChangeText} value={this.state.alamat} namaState="alamat" />
          </View>
          <TouchableOpacity style={style.submit} onPress={this.onSubmit}>
            <Text style={style.submitText}>SUBMIT</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default Tambah;

const style = StyleSheet.create({
  uwu: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: "90%",
    alignSelf: "center",
  },
  submit: {
    alignSelf: "center",
    backgroundColor: "#09d4c8",
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    width: "90%",
  },
  submitText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  buttonRiwayat: {
    backgroundColor: "#09d4c8",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: "50%",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 10,
    
   
  },
});

