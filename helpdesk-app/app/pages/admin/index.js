import React from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity,Image } from 'react-native';

const AdminScreen = ({ navigation }) => {
  
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

      <Text style={styles.title}>Welcome Admin!</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="View All Tickets" 
          onPress={() => navigation.navigate('AdminRiwayatTicket')} 
        />
        <Button title="Logout" onPress={handleLogOut}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 280,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-around',
    height: 150,
    padding: 20,
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
    color: "white",
  },
  image: {
    width: 50,
    height: 50,

    marginTop: -40,
    marginLeft: 20,
  },
});

export default AdminScreen;
