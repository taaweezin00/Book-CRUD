import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const { id } = useLocalSearchParams();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://192.168.87.217:3000/books/${id}`);
      const data = await response.json();
      setBook(data);
      setFormData(data);
    } catch (error) {
      console.error("Error fetching book details:", error);
      Alert.alert("Error", "Failed to fetch book details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const response = await fetch(`http://192.168.87.217:3000/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year),
          price: parseFloat(formData.price),
        }),
      });
      
      if (response.ok) {
        Alert.alert("Success", "Book updated successfully");
        setEditing(false);
        fetchBook();
      } else {
        throw new Error("Failed to update book");
      }
    } catch (error) {
      console.error("Error updating book:", error);
      Alert.alert("Error", "Failed to update book");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this book?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                `http://192.168.87.217:3000/books/${id}`,
                {
                  method: "DELETE",
                }
              );
              if (response.ok) {
                Alert.alert("Success", "Book deleted successfully", [
                  { text: "OK", onPress: () => router.back() },
                ]);
              } else {
                throw new Error("Failed to delete book");
              }
            } catch (error) {
              console.error("Error deleting book:", error);
              Alert.alert("Error", "Failed to delete book");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading book details...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.centerContainer}>
        <Text>Book not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#007BFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>รายละเอียดหนังสือ</Text>
        <View style={styles.headerActions}>
          {editing ? (
            <TouchableOpacity onPress={() => setEditing(false)}>
              <Icon name="close" size={24} color="#ff3b30" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setEditing(true)}>
              <Icon name="edit" size={24} color="#007BFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ชื่อหนังสือ</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) => handleChange("title", text)}
            />
          ) : (
            <Text style={styles.value}>{book.title}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ผู้เขียน</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={formData.author}
              onChangeText={(text) => handleChange("author", text)}
            />
          ) : (
            <Text style={styles.value}>{book.author}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>คำอธิบาย</Text>
          {editing ? (
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => handleChange("description", text)}
              multiline
              numberOfLines={4}
            />
          ) : (
            <Text style={styles.value}>
              {book.description || "ไม่มีคำอธิบาย"}
            </Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ประเภท</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={formData.genre}
              onChangeText={(text) => handleChange("genre", text)}
            />
          ) : (
            <Text style={styles.value}>{book.genre || "ไม่ได้กำหนด"}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ปีที่พิมพ์</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={String(formData.year)}
              onChangeText={(text) => handleChange("year", text)}
              keyboardType="numeric"
            />
          ) : (
            <Text style={styles.value}>{book.year}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ราคา</Text>
          {editing ? (
            <TextInput
              style={styles.input}
              value={String(formData.price)}
              onChangeText={(text) => handleChange("price", text)}
              keyboardType="decimal-pad"
            />
          ) : (
            <Text style={styles.value}>฿{book.price}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>สถานะ</Text>
          {editing ? (
            <View style={styles.switchContainer}>
              <TouchableOpacity
                style={[
                  styles.switch,
                  formData.available ? styles.switchOn : styles.switchOff,
                ]}
                onPress={() => handleChange("available", !formData.available)}
              >
                <View
                  style={[
                    styles.switchThumb,
                    formData.available
                      ? styles.switchThumbOn
                      : styles.switchThumbOff,
                  ]}
                />
              </TouchableOpacity>
              <Text style={styles.switchLabel}>
                {formData.available ? "พร้อมขาย" : "ไม่พร้อมขาย"}
              </Text>
            </View>
          ) : (
            <Text style={styles.value}>
              {book.available ? "พร้อมขาย" : "ไม่พร้อมขาย"}
            </Text>
          )}
        </View>

        {editing && (
          <TouchableOpacity
            style={[styles.button, updating && styles.buttonDisabled]}
            onPress={handleUpdate}
            disabled={updating}
          >
            {updating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>บันทึกการเปลี่ยนแปลง</Text>
            )}
          </TouchableOpacity>
        )}

        {!editing && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Text style={styles.deleteButtonText}>ลบหนังสือ</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default BookDetail;

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
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#666",
  },
  value: {
    fontSize: 16,
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    width: 50,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    padding: 2,
    marginRight: 8,
  },
  switchOn: {
    backgroundColor: "#007BFF",
  },
  switchOff: {
    backgroundColor: "#ccc",
  },
  switchThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  switchThumbOn: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  switchThumbOff: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
  },
  switchLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});