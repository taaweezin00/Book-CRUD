import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import { Link } from "expo-router";

const Home = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("../assets/image/profile.jpg")}
          style={styles.profile}
        />
        <Text style={styles.title}>ระบบจัดการหนังสือ</Text>
        <Text style={styles.subtitle}>ยินดีต้อนรับสู่แอปพลิเคชันจัดการหนังสือ</Text>
        
        <View style={styles.buttonContainer}>
          <Link href={"/book"} style={styles.button}>
            <Text style={styles.buttonText}>ดูหนังสือทั้งหมด</Text>
          </Link>
          <Link href={"/book_new"} style={styles.button}>
            <Text style={styles.buttonText}>เพิ่มหนังสือใหม่</Text>
          </Link>
          <Link href={"/signin"} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>เข้าสู่ระบบ</Text>
          </Link>
          <Link href={"/signup"} style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>สมัครสมาชิก</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profile: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    maxWidth: 300,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dee2e6",
  },
  secondaryButtonText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "600",
  },
});