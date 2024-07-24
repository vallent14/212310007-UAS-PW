import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Set initial values for the text inputs
  useEffect(() => {
    setUsername("");
    setPassword("");
  }, []);

  const handleLogin = () => {
    if (username === "User" && password === "User") {
      navigation.navigate("Tambah");
    } else if (username === "Admin" && password === "Admin") {
      navigation.navigate("AdminRiwayatTicket");
    } else {
      Alert.alert("Error", "Invalid username or password");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.helpdesk}>
        <Text style={styles.THelpdesk}>IBIK Help Desk</Text>
        <View>
          <Image source={require("../images/ibik.png")} style={styles.image} />
        </View>
      </View>
      <Text style={styles.texta}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Text style={styles.texta}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    color: "black",
  },
  texta : {
    color: "black",
    marginLeft: 30,
    marginBottom: 10,

    
    
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: "black",
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    alignSelf: "center",
  },
  helpdesk: {
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
    color: "black",
  },

  image: {
    width: 50,
    height: 50,

    marginTop: -40,
    marginLeft: 20,
  },

  button: {
    color: "black",
    backgroundColor: "#09d4c8",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    padding: 10,
    width: "40%",
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 20,
  },
});

export default LoginScreen;
