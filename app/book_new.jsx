import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";

const BookNew = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: "",
    price: "",
    available: true,
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleCreate = async () => {
    // Validate required fields
    if (!formData.title || !formData.author) {
      Alert.alert("Error", "Please fill in required fields (Title and Author)");
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch("http://192.168.87.217:3000/books", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    ...formData,
    year: formData.year ? parseInt(formData.year) : 2024,
    price: formData.price ? parseFloat(formData.price) : 0,
  }),
});

      if (response.ok) {
        Alert.alert("Success", "Book created successfully", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        throw new Error("Failed to create book");
      }
    } catch (error) {
      console.error("Error creating book:", error);
      Alert.alert("Error", "Failed to create book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>เพิ่มหนังสือใหม่</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ชื่อหนังสือ *</Text>
          <TextInput
            style={styles.input}
            value={formData.title}
            onChangeText={(text) => handleChange("title", text)}
            placeholder="Enter book title"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ผู้เขียน *</Text>
          <TextInput
            style={styles.input}
            value={formData.author}
            onChangeText={(text) => handleChange("author", text)}
            placeholder="Enter author name"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>คำอธิบาย</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => handleChange("description", text)}
            placeholder="Enter book description"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ประเภท</Text>
          <TextInput
            style={styles.input}
            value={formData.genre}
            onChangeText={(text) => handleChange("genre", text)}
            placeholder="Enter genre"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ปีที่พิมพ์</Text>
          <TextInput
            style={styles.input}
            value={formData.year}
            onChangeText={(text) => handleChange("year", text)}
            placeholder="Enter publication year"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>ราคา</Text>
          <TextInput
            style={styles.input}
            value={formData.price}
            onChangeText={(text) => handleChange("price", text)}
            placeholder="Enter price"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>พร้อมขาย</Text>
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
                {formData.available ? "ใช่" : "ไม่"}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCreate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>สร้างหนังสือ</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelButtonText}>ยกเลิก</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "600",
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontSize: 14,
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
  cancelButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
  },
});