import { TouchableOpacity, Text } from "react-native";
import { useTheme } from "../context/ThemeContext"; // Adjust the import path as necessary
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, color } = useTheme(); // Assuming useTheme is a custom hook that provides theme context
  return (
    <TouchableOpacity onPress={toggleTheme}>
      <Text
        style={{
          color: color.text,
        }}
      >
        {isDarkMode ? "Dark" : "Light"}
      </Text>
    </TouchableOpacity>
  );
};
export default ThemeToggle;
