import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Search } from "./Icons";

export function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleChange = (text) => {
    setQuery(text);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={query}
        onChangeText={handleChange}
      />
      <Pressable onPress={handleSearch} style={styles.searchButton}>
        <Search width={32} height={32} fill="#000" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f2f2f2",
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 16,
    fontSize: 16,
    borderRadius: 25,
    backgroundColor: "#fff",
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 30,
    marginLeft: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});
