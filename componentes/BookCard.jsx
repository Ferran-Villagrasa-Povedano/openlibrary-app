import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { getCoverURL, getId } from "../lib/utils";

export function BookCard({ book }) {
  return (
    <View style={styles.row}>
      <Link href={`./DetailScreen?id=${getId(book)}`} asChild>
        <Pressable>
          <View style={styles.container}>
            <Text style={styles.title}>{book?.title}</Text>
            <Text style={styles.author}>
              {(book?.author_name || []).join(", ")}
            </Text>
            <Image
              source={{ uri: getCoverURL(book?.cover_i, "M") }}
              style={styles.cover}
            />
          </View>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    alignItems: "center",
    width: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  author: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 10,
  },
  cover: {
    width: 120,
    height: 180,
    resizeMode: "cover",
    borderRadius: 5,
    marginBottom: 10,
  },
});
