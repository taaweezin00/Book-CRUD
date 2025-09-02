import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";

const Book = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://192.168.87.217:3000/books");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching book data:", error);
      Alert.alert("Error", "Failed to fetch books");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    console.log("Book component mounted");
    fetchBooks();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchBooks();
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading books...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>หนังสือทั้งหมด</Text>
        <Link href={"/book_new"} style={styles.addButton}>
          <Icon name="add" size={24} color="#fff" />
        </Link>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                router.push(`/book_detail?id=${item.id}`);
              }}
            >
              <View style={styles.bookItem}>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>{item.title}</Text>
                  <Text style={styles.bookAuthor}>โดย {item.author}</Text>
                  {item.genre && (
                    <Text style={styles.bookGenre}>{item.genre}</Text>
                  )}
                  <Text style={styles.bookPrice}>฿{item.price}</Text>
                </View>
                <Icon name="chevron-right" size={24} color="#999" />
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text>No books found</Text>
          </View>
        }
      />
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007BFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bookItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  bookGenre: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  bookPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007BFF",
  },
});