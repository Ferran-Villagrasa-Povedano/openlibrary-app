import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getAuthorDetails, getBookDetails } from "../lib/api";
import { getCoverURL } from "../lib/utils";
import { getId } from "./../lib/utils";

export default function DetailsScreen() {
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    getBookDetails(id).then((data) => {
      console.log(data);
      setBook(data);

      data.authors.forEach((authorObj) => {
        getAuthorDetails(getId(authorObj.author)).then((authorData) => {
          setAuthors((prevAuthors) => [...prevAuthors, authorData]);
        });
      });
    });
  }, [id]);

  if (!book) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: getCoverURL(book.covers?.[0]) }}
        style={styles.cover}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.authors}>
          {authors.length > 0
            ? authors.map((author) => author.name).join(", ")
            : "Loading authors..."}
        </Text>
        <Text style={styles.description}>{book.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  cover: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 16,
  },
  detailsContainer: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  authors: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 16,
    color: "#666",
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
