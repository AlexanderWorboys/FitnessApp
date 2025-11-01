
import { Button } from "./Button";
import { useThemeStore } from "../../store/themeStore";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <Button
      label={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
      onPress={toggleTheme}
    />
  );
};


