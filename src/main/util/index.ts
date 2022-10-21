import path from "path";

export function getTabBarURL() {
  if (isDev()) {
    return "http://localhost:4000";
  } else {
    return `file://${path.resolve(__dirname, "renderer/index.html")}`;
  }
}

export function getNewTabURL() {
  if (isDev()) {
    return `file://${path.resolve( __dirname, "../../../public/newtab.html")}`; 
  }
  return `file://${path.resolve(__dirname, "renderer/newtab.html")}`;
}

export function isDev() {
  return process.env.NODE_ENV === "development";
}
