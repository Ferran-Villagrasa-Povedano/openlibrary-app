import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Pressable, Image } from 'react-native';

import { BookCard } from '../componentes/BookCard'
import { Link } from 'expo-router';
import { getBookById, searchBooks } from '../lib/api';

export default function HomeScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    searchBooks('bestsellers', 10).then((bestsellers) => {;
      setBooks(bestsellers.docs);
    });
  }, []);

  return (
      <View style={styles.container}>
        <Link asChild href={"./SearchScreen"}>
          <Pressable style={styles.searchButton}>
            <Image style={styles.searchIcon} source={ "../assets/black-search-icon.png" } />
          </Pressable>
        </Link>
        <FlatList
          data={books}
          renderItem={({ item }) => <BookCard book={item} />}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.listContent}
          verticall
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
    padding: 10,
  },
  searchButton: {
    backgroundColor: '#ccc'
  }
});
