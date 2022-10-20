import path from "path";

export function getTabBarURL() {
  if (isDev()) {
    return "http://localhost:4000";
  } else {
    return `file://${path.resolve(__dirname, "renderer/index.html")}`;
  }
}

export function genNewTabId() {
  return "";
}

export function isDev() {
  return process.env.NODE_ENV === "development";
}
