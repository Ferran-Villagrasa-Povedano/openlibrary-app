import { StyleSheet, Text, View, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { getBookById } from '../../lib/api';
import { getCoverURL } from '../../lib/utils';

export default function DetailsScreen() {
  const [book, setBook] = useState({});
  useEffect(() => {
    getBookById(bookId).then((data) => {
      setBook(data);
      console.log(data);
    });
  }, []);


  const { bookId } = useLocalSearchParams();
  return (
    <View style={styles.container}>
      <Image source={{ uri: getCoverURL(book.covers[0]) }} style={styles.cover} />
      <Text>{book.title}</Text>
      <Text>{book.author}</Text>
      <Text>{book.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cover: {
    width: 200,
    height: 200,
  }
});
