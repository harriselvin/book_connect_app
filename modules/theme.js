// theme.js
export function setTheme(theme) {
    const day = {
      dark: "10, 10, 20",
      light: "255, 255, 255",
    };
  
    const night = {
      dark: "255, 255, 255",
      light: "10, 10, 20",
    };
  
    const body = document.querySelector("body");
    const dataSettingsTheme = document.querySelector("[data-settings-theme]");
  
    if (dataSettingsTheme.value === "day") {
      body.style.setProperty("--color-dark", day.dark);
      body.style.setProperty("--color-light", day.light);
    }
  
    if (dataSettingsTheme.value === "night") {
      body.style.setProperty("--color-dark", night.dark);
      body.style.setProperty("--color-light", night.light);
    }
  }
  