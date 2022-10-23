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
    return `file://${path.resolve( __dirname, "../../../public/opus_pages/OPUS_NEWTAB.html")}`; 
  }
  return `file://${path.resolve(__dirname, "renderer/OPUS_NEWTAB.html")}`;
}

export function getErrorTabUrl() {
  if (isDev()) {
    return `file://${path.resolve( __dirname, "../../../public/opus_pages/OPUS_ERROR.html")}`; 
  }
  return `file://${path.resolve(__dirname, "renderer/OPUS_ERROR.html")}`;
}

export function isDev() {
  return process.env.NODE_ENV === "development";
}
