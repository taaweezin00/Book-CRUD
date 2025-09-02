import { View, Text, StyleSheet } from "react-native";

const About = () => {
  return (
    <View style={style.container}>
      <Text style={style.title}>About Us</Text>
      <Text style={style.text}>
        We are a team of passionate developers dedicated to creating amazing
        applications. Our mission is to deliver high-quality software that
        enhances user experience and meets the needs of our clients.
      </Text>
    </View>
  );
};
export default About;

const style = StyleSheet.create({
  container: {
    marginVertical: 14,
    marginHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 34,
  },
  text: {},
  profile: {
    height: 128,
    width: 128,
    borderRadius: 50,
  },
});
