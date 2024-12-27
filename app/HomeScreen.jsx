import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from "react-native";

import { BookCard } from "../componentes/BookCard";
import { SearchBar } from "../componentes/SearchBar";
import { searchBooks } from "../lib/api";

const NUMBER_OF_RESULTS = 25;

export default function HomeScreen() {
  const [books, setBooks] = useState([]);
  const [numColumns, setNumColumns] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to update numColumns based on width
    const updateNumColumns = () => {
      const { width } = Dimensions.get("window");
      console.log("Width:", width);
      if (width > 868) {
        setNumColumns(4);
      } else if (width > 480) {
        setNumColumns(3);
      } else {
        setNumColumns(1);
      }
    };

    // Update columns initially
    updateNumColumns();

    // Add listener for screen size changes
    const subscription = Dimensions.addEventListener(
      "change",
      updateNumColumns
    );

    // Cleanup the listener on unmount
    return () => {
      subscription.remove();
    };
  }, []);

  // Get bestsellers on first render
  useEffect(() => {
    searchBooks("bestsellers", NUMBER_OF_RESULTS).then((bestsellers) => {
      setBooks(bestsellers.docs);
      setIsLoading(false);
    });
  }, []);

  const onSearch = (query) => {
    console.log(query);
    setIsLoading(true);
    searchBooks(query, NUMBER_OF_RESULTS).then((results) => {
      setBooks(results.docs);
      setIsLoading(false);
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={onSearch} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#000" style={styles.spinner} />
      ) : (
        <FlatList
          data={books}
          renderItem={({ item }) => <BookCard book={item} />}
          keyExtractor={(item) => item.key}
          numColumns={numColumns}
          key={numColumns} // Add key to trigger re-render on column change
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#ccc",
  },
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
