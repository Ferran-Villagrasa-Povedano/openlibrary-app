import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  ToastAndroid,
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("bestsellers");

  // Function to update numColumns based on screen width
  useEffect(() => {
    const updateNumColumns = () => {
      const { width } = Dimensions.get("window");
      if (width > 868) {
        setNumColumns(4);
      } else if (width > 480) {
        setNumColumns(3);
      } else {
        setNumColumns(1);
      }
    };

    updateNumColumns();

    const subscription = Dimensions.addEventListener(
      "change",
      updateNumColumns
    );

    return () => {
      subscription.remove();
    };
  }, []);

  // Function to fetch books
  const fetchBooks = (query, page) => {
    setIsLoading(true);
    searchBooks({ q: query, limit: NUMBER_OF_RESULTS, page: page })
      .then((results) => {
        setBooks((prevBooks) =>
          page === 1 ? results.docs : [...prevBooks, ...results.docs]
        );
        setIsLoading(false);
        setIsRefreshing(false);
        setLoadingMore(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsRefreshing(false);
        setLoadingMore(false);
        ToastAndroid.show("Error fetching books", ToastAndroid.SHORT);
      });
  };

  // Handle initial search and subsequent fetch
  useEffect(() => {
    fetchBooks(query, page);
  }, [query, page]);

  // Handle search query change
  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setBooks([]);
    fetchBooks(query, 1);
  };

  // Handle pull-to-refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchBooks(query, 1);
  };

  // Handle infinite scroll when reaching the end
  const handleEndReached = () => {
    if (!loadingMore && !isLoading) {
      setLoadingMore(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      {isLoading && page === 1 ? (
        <ActivityIndicator size="large" color="#000" style={styles.spinner} />
      ) : (
        <FlatList
          data={books}
          renderItem={({ item }) => <BookCard book={item} />}
          keyExtractor={(item) => item.key}
          numColumns={numColumns}
          key={numColumns}
          contentContainerStyle={styles.listContent}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5} // Trigger loading more when 50% of the list is visible
          ListFooterComponent={
            loadingMore ?? (
              <ActivityIndicator
                size="large"
                color="#000"
                style={styles.spinner}
              />
            )
          }
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
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
