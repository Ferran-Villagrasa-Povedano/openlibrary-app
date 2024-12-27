import { useState } from 'react';
import { Pressable, StyleSheet, FlatList, View, TextInput, Image } from 'react-native';
import { searchBooks } from '../lib/api';
import { BookCard } from '../componentes/BookCard'


export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);

  // Search interaction, search the books that is in the InputText 
  const handleSearchBooks = async () => {
    try {
      const searchResults = await searchBooks(search, 5); 
      console.log(searchResults.docs); 
      setBooks(searchResults.docs); 
    } catch (error) {
      console.error('Error fetching books:', error); 
    }
    setSearch(''); 
  };


  return (
    <View style={styles.container}>
      <View style={[styles.container, { flexDirection: 'row', alignItems: 'center' }]}>
        <TextInput
          style={styles.input}
          onChangeText={setSearch}
          value={search}
          placeholder="Search a Book"
        />
        <Pressable style={styles.searchButton} onPress={handleSearchBooks}>
          <Image style={styles.searchIcon} source={"../assets/searchIcon.png"} />
        </Pressable>
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 16,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  searchButton: {
    alignContent: 'right',
    backgroundColor: '#ccc'
  },
});
