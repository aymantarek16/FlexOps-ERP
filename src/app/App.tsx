import { useEffect } from "react";
import { AppRoutes } from "./routes";
import { useFlexOpsStore } from "../store/useFlexOpsStore";
import { hexToRgba } from "../utils/theme";

export function App(): JSX.Element {
  const primaryColor = useFlexOpsStore((state) => state.settings.primaryColor);
  const theme = useFlexOpsStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty("--primary-soft", hexToRgba(primaryColor, theme === "dark" ? 0.22 : 0.12));
  }, [primaryColor, theme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return <AppRoutes />;
}
