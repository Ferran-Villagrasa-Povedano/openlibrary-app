import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { getBookById } from '../lib/api';
import { getCoverURL } from '../lib/utils';

export default function DetailsScreen() {
  const [book, setBook] = useState({});
  const { bookId } = useLocalSearchParams();

  useEffect(() => {
    getBookById(bookId).then((data) => {
      setBook(data);
      console.log(data);
    });
  }, [bookId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: getCoverURL(book.covers?.[0]) }}
        style={styles.cover}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        <Text style={styles.description}>{book.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  cover: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 10,
  },
  detailsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  author: {
    fontSize: 18,
    fontStyle: 'italic',
    marginBottom: 15,
    color: '#555',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
    marginHorizontal: 10,
  },
});
