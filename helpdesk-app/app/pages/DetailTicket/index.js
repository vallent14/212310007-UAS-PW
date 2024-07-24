import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { database } from '../../config/firebase';
import { ref, remove } from 'firebase/database';

const DetailTicket = ({ route, navigation }) => {
  const { ticket } = route.params;

  const handleDelete = () => {
    const ticketRef = ref(database, `kontak/${ticket.id}`);
    remove(ticketRef).then(() => {
      Alert.alert("Sukses", "Data berhasil dihapus");
      navigation.navigate('AdminRiwayatTicket');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ticket.nama}</Text>
      <Text>Email: {ticket.email}</Text>
      <Text>Alamat: {ticket.alamat}</Text>
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DetailTicket;
